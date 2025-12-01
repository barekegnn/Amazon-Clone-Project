const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeBestSellers() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://www.amazon.com/gp/bestsellers/books/', { waitUntil: 'networkidle2' });

  // Scroll down to load lazy-loaded images
  await autoScroll(page);

  const scrapedData = await page.evaluate(() => {
    const images = new Set();
    const imgElements = Array.from(document.querySelectorAll('img'));

    for (const img of imgElements) {
      if (img.naturalWidth > 100 && img.naturalHeight > 100) {
        let src = img.src;
        if (img.dataset.src) {
          src = img.dataset.src;
        }
        if (src && (src.startsWith('http') || src.startsWith('https'))) {
           images.add(src);
        }
      }
    }
    
    return [{
      category: "Best Sellers in Books",
      images: [...images]
    }];
  });

  await browser.close();
  
  fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2));
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight * 2) { 
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

scrapeBestSellers();