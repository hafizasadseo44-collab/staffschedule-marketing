const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const projectDir = process.cwd();
const localBinDir = path.join(projectDir, '.npm-local');

console.log('Installing npm locally into', localBinDir);
console.log('Node version:', process.version);

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  try {
    if (!fs.existsSync(localBinDir)) fs.mkdirSync(localBinDir, { recursive: true });

    console.log('Fetching npm registry info...');
    const regData = await download('https://registry.npmjs.org/npm/latest');
    const info = JSON.parse(regData.toString());
    console.log('Latest npm:', info.version);
    
    const tarballUrl = info.dist.tarball;
    console.log('Downloading', tarballUrl);
    const tarball = await download(tarballUrl);
    
    const tarballPath = path.join(localBinDir, 'npm.tgz');
    fs.writeFileSync(tarballPath, tarball);
    console.log('Downloaded', tarball.length, 'bytes');

    console.log('Extracting...');
    execSync(`tar -xzf "${tarballPath}" -C "${localBinDir}"`, { stdio: 'inherit' });
    
    // The tarball extracts to a "package" folder
    const npmCliPath = path.join(localBinDir, 'package', 'bin', 'npm-cli.js');
    if (!fs.existsSync(npmCliPath)) {
      console.error('npm-cli.js not found at', npmCliPath);
      process.exit(1);
    }
    
    fs.unlinkSync(tarballPath);
    
    console.log('\n✅ npm installed locally!');
    console.log('npm-cli.js is at:', npmCliPath);
    
    // Verify it works
    console.log('\nVerifying npm...');
    execSync(`node "${npmCliPath}" --version`, { stdio: 'inherit' });
    
    // Now run "npm run dev"
    console.log('\n--- Starting dev server ---');
    execSync(`node "${npmCliPath}" run dev`, { stdio: 'inherit', cwd: projectDir });
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
