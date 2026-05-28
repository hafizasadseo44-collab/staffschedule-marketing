const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
const prismaDbPath = path.join(process.cwd(), 'prisma', 'dev.db');

console.log('--- Hostinger / Production Deployment Setup Script ---');

// 1. Check and Create .env
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Creating one automatically...');
  fs.writeFileSync(envPath, 'DATABASE_URL="file:./prisma/dev.db"\n');
  console.log('✅ Created .env with DATABASE_URL="file:./prisma/dev.db"');
} else {
  console.log('✅ .env file already exists.');
}

try {
  // 2. Generate Prisma Client
  console.log('\n🚀 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully.');

  // 3. Push Database Schema (Creates dev.db if missing)
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
