const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
const prismaDbPath = path.join(process.cwd(), 'prisma', 'dev.db');

console.log('--- Hostinger / Production Deployment Setup Script ---');
console.log('Platform:', process.platform, '| Arch:', process.arch);

// 1. Check and Create .env
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Creating one automatically...');
  fs.writeFileSync(envPath, 'DATABASE_URL="file:./prisma/dev.db"\n');
  console.log('✅ Created .env with DATABASE_URL="file:./prisma/dev.db"');
} else {
  console.log('✅ .env file already exists.');
}

// 2. Fix TailwindCSS native bindings on Linux (Hostinger)
if (process.platform !== 'win32') {
  try {
    console.log('\n🔧 Fixing TailwindCSS/oxide native bindings for Linux...');
    // Remove any Windows-specific native modules that break Linux
    const oxidePath = path.join(process.cwd(), 'node_modules', '@tailwindcss', 'oxide');
    if (fs.existsSync(oxidePath)) {
      // Force reinstall the oxide package for the correct platform
      execSync('npm rebuild @tailwindcss/oxide 2>/dev/null || true', { stdio: 'inherit' });
    }
    // Also rebuild lightningcss which has native bindings
    execSync('npm rebuild lightningcss 2>/dev/null || true', { stdio: 'inherit' });
    console.log('✅ Native bindings rebuilt for current platform.');
  } catch (e) {
    console.log('⚠️ Native binding rebuild had issues, continuing...');
  }
}

try {
  // 3. Generate Prisma Client
  console.log('\n🚀 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully.');

  // Fix EACCES permissions on Hostinger for Prisma engines
  if (process.platform !== 'win32') {
    try {
      console.log('🔧 Fixing Prisma engine permissions...');
      execSync('chmod -R +x node_modules/@prisma/engines || true', { stdio: 'inherit' });
      execSync('chmod -R +x node_modules/.prisma || true', { stdio: 'inherit' });
    } catch (e) {
      console.log('⚠️ Could not change permissions, continuing...');
    }
  }

  // 4. Push Database Schema (Creates dev.db if missing)
  console.log('\n🚀 Pushing Database Schema (Creating SQLite DB if needed)...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
  console.log('✅ Database schema synchronized.');

  if (fs.existsSync(prismaDbPath)) {
    console.log('✅ SQLite database file (prisma/dev.db) is present.');
  }

  console.log('\n🎉 Setup completed successfully. Ready for Next.js build!');
} catch (error) {
  console.error('\n❌ Error during Prisma setup:', error.message);
  process.exit(1);
}
