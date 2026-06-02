import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const PRODUCTS_DIR = './public/images/products';
const QUALITY = 80;

async function compressImages() {
  const files = await readdir(PRODUCTS_DIR);
  const pngFiles = files.filter(f => extname(f).toLowerCase() === '.png');
  
  console.log(`Found ${pngFiles.length} PNG files to compress...`);
  
  let compressed = 0;
  let skipped = 0;
  
  for (const file of pngFiles) {
    const inputPath = join(PRODUCTS_DIR, file);
    const outputPath = join(PRODUCTS_DIR, file.replace('.png', '.webp'));
    
    try {
      const inputStat = await stat(inputPath);
      
      await sharp(inputPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(outputPath);
      
      const outputStat = await stat(outputPath);
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
