import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const PRODUCTS_DIR = './public/images/products';
const QUALITY = 80;
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function compressImages() {
  const files = await readdir(PRODUCTS_DIR);
  const imageFiles = files.filter(f => EXTENSIONS.includes(extname(f).toLowerCase()));
  
  console.log(`Found ${imageFiles.length} images to compress...`);
  
  let compressed = 0;
  let skipped = 0;
  
  for (const file of imageFiles) {
    const ext = extname(file).toLowerCase();
    const inputPath = join(PRODUCTS_DIR, file);
    const webpPath = join(PRODUCTS_DIR, file.replace(ext, '.webp'));

    // Skip if WebP already exists
    try {
      await stat(webpPath);
      skipped++;
      continue;
    } catch {}

    try {
      const inputStat = await stat(inputPath);
      
      await sharp(inputPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(webpPath);
      
      const outputStat = await stat(webpPath);
      const savings = Math.round((1 - outputStat.size / inputStat.size) * 100);
      
      console.log(`✓ ${file} → ${savings}% smaller (${Math.round(inputStat.size/1024)}KB → ${Math.round(outputStat.size/1024)}KB)`);
      compressed++;
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
      skipped++;
    }
  }
  
  console.log(`\nDone! Compressed: ${compressed}, Skipped: ${skipped}`);
}

compressImages().catch(console.error);
