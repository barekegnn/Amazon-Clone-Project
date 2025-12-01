const fs = require('fs');
const https = require('https');
const path = require('path');

// Read the file, remove BOM, then parse
const fileContent = fs.readFileSync('scraped_data.json', 'utf-8');
const data = JSON.parse(fileContent.replace(/^\uFEFF/, ''));


const assetsDir = path.join('public', 'assets');
let totalImages = 0;
let totalCategories = 0;

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function sanitizeCategoryName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}

async function download() {
  for (const categoryData of data) {
    const categoryName = sanitizeCategoryName(categoryData.category);
    const categoryDir = path.join(assetsDir, categoryName);

    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    totalCategories++;

    let imageCounter = 1;
    for (const imageUrl of categoryData.images) {
      // Filter out the sprite sheet
      if (imageUrl.includes('nav-sprite-global')) {
        continue;
      }

      const imageName = `product_${String(imageCounter).padStart(2, '0')}.jpg`;
      const imagePath = path.join(categoryDir, imageName);

      try {
        await new Promise((resolve, reject) => {
          const file = fs.createWriteStream(imagePath);
          https.get(imageUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          }).on('error', (err) => {
            fs.unlink(imagePath, () => reject(err));
          });
        });
        totalImages++;
      } catch (error) {
        console.error(`Failed to download ${imageUrl}: ${error.message}`);
      }
      imageCounter++;
    }
  }

  console.log(`\n--- Download Complete ---`);
  console.log(`Total categories created: ${totalCategories}`);
  console.log(`Total images downloaded: ${totalImages}`);

  const createdFolders = data.map(cat => sanitizeCategoryName(cat.category));
  console.log(`\nFinal category folders created:`);
  createdFolders.forEach(folder => console.log(`- ${folder}`));
}

download();
