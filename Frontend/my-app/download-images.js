import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
};

// All images to download
const images = [
  // Row 1 - Gaming Accessories
  { url: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop', path: 'gaming/headset.jpg' },
  { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', path: 'gaming/keyboard.jpg' },
  { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', path: 'gaming/mouse.jpg' },
  { url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop', path: 'gaming/chair.jpg' },
  
  // Row 1 - PC Deals
  { url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop', path: 'pc/desktop.jpg' },
  
  // Row 1 - Refresh your space
  { url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop', path: 'home/dining.jpg' },
  { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', path: 'home/decor.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', path: 'home/kitchen.jpg' },
  { url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop', path: 'home/health.jpg' },
  
  // Row 1 - Toys & Games
  { url: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop', path: 'toys/toys-games.jpg' },
  
  // Row 2 - Amazon Basics, Electronics, Home & Kitchen, Beauty
  { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', path: 'misc/amazon-basics.jpg' },
  { url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop', path: 'electronics/electronics.jpg' },
  { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop', path: 'home/decor2.jpg' },
  { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', path: 'home/bedding.jpg' },
  { url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop', path: 'home/towers.jpg' },
  { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', path: 'misc/beauty.jpg' },
  
  // Row 3 - Holiday Carousel
  { url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=200&h=200&fit=crop', path: 'holiday/ornaments.jpg' },
  { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop', path: 'holiday/gift-sets.jpg' },
  { url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=200&h=200&fit=crop', path: 'holiday/lights.jpg' },
  { url: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=200&h=200&fit=crop', path: 'holiday/wreaths.jpg' },
  { url: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=200&h=200&fit=crop', path: 'holiday/candles.jpg' },
  { url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=200&fit=crop', path: 'holiday/gift-wrap.jpg' },
  { url: 'https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=200&h=200&fit=crop', path: 'holiday/stockings.jpg' },
  { url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop', path: 'holiday/mugs.jpg' },
  { url: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=200&h=200&fit=crop', path: 'holiday/snow-globes.jpg' },
  { url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=200&h=200&fit=crop', path: 'holiday/treats.jpg' },
  
  // Row 4 - Easy Returns, Fashion, Fitness, Kindle
  { url: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop', path: 'misc/returns.jpg' },
  { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', path: 'fashion/jeans.jpg' },
  { url: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=400&fit=crop', path: 'fashion/tops.jpg' },
  { url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', path: 'fashion/dresses.jpg' },
  { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', path: 'fashion/shoes.jpg' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', path: 'fitness/fitness.jpg' },
  { url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop', path: 'electronics/kindle.jpg' },
  
  // Row 5 - Books Carousel
  { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop', path: 'books/fiction.jpg' },
  { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop', path: 'books/mystery.jpg' },
  { url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop', path: 'books/self-help.jpg' },
  { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop', path: 'books/cookbook.jpg' },
  { url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&h=200&fit=crop', path: 'books/biography.jpg' },
  { url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=200&fit=crop', path: 'books/scifi.jpg' },
  { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop', path: 'books/travel.jpg' },
  { url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&h=200&fit=crop', path: 'books/business.jpg' },
  { url: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=200&h=200&fit=crop', path: 'books/art.jpg' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop', path: 'books/children.jpg' },
  
  // Row 6 - Laptops, Health, Strip Lights, Toys
  { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', path: 'electronics/laptop.jpg' },
  { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop', path: 'misc/health-care.jpg' },
  { url: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=400&fit=crop', path: 'electronics/strip-lights.jpg' },
  { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', path: 'toys/action-figures.jpg' },
  { url: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop', path: 'toys/dolls.jpg' },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', path: 'toys/bikes.jpg' },
  { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop', path: 'toys/arts-crafts.jpg' },
  
  // Row 7 - Pet Supplies, Smartwatches, Tools, Gardening
  { url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop', path: 'misc/pet-supplies.jpg' },
  { url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', path: 'electronics/smartwatch.jpg' },
  { url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop', path: 'misc/tools.jpg' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop', path: 'home/outdoor-decor.jpg' },
  { url: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400&h=400&fit=crop', path: 'home/furniture.jpg' },
  { url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=400&fit=crop', path: 'home/lawn-care.jpg' },
  { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', path: 'home/gardening.jpg' },
];

// Main download function
const downloadAllImages = async () => {
  const baseDir = path.join(__dirname, 'src', 'assets', 'products');
  
  console.log('🚀 Starting image download...\n');
  
  // Create all necessary directories
  const dirs = ['gaming', 'pc', 'home', 'toys', 'electronics', 'fashion', 'fitness', 'books', 'holiday', 'misc'];
  dirs.forEach(dir => createDir(path.join(baseDir, dir)));
  
  let successCount = 0;
  let failCount = 0;
  
  // Download images sequentially to avoid overwhelming the server
  for (const image of images) {
    const filepath = path.join(baseDir, image.path);
    try {
      await downloadImage(image.url, filepath);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${image.path} - ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n✅ Download complete!`);
  console.log(`   Success: ${successCount}/${images.length}`);
  if (failCount > 0) {
    console.log(`   Failed: ${failCount}/${images.length}`);
  }
};

// Run the script
downloadAllImages().catch(console.error);
