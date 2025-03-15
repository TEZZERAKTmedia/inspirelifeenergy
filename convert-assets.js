import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Setup ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Directories to process
const assetDirs = [
  './Frontend/adminFrontEnd/assets',
  './Frontend/userFrontEnd/assets',
  './Frontend/registerFrontEnd/assets'
];

const imageExtensions = ['.jpg', '.jpeg', '.png'];
const videoExtensions = ['.mp4'];

const convertImageToWebP = async (inputPath) => {
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    console.log(`✅ Converted image: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting image ${inputPath}:`, error.message);
  }
};

const convertVideoToWebM = (inputPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/\.mp4$/i, '.webm');

    ffmpeg(inputPath)
      .outputOptions(['-c:v libvpx-vp9', '-crf 30', '-b:v 0', '-c:a libopus'])
      .on('end', () => {
        console.log(`✅ Video converted: ${outputPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error converting video ${inputPath}:`, err);
        reject(err);
      })
      .save(outputPath);
  });
};

const processDirectory = async (dir) => {
  const items = await fs.readdir(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      await processDirectory(itemPath);
    } else if (stats.isFile()) {
      const ext = path.extname(item).toLowerCase();

      if (imageExtensions.includes(ext)) {
        await convertImageToWebP(itemPath);
      } else if (videoExtensions.includes(ext)) {
        await convertVideoToWebM(itemPath);
      } else {
        console.log(`⚠️ Skipped (unsupported type): ${itemPath}`);
      }
    }
  }
};

async function main() {
  for (const dir of assetDirs) {
    const fullPath = path.resolve(dir);
    if (await fs.pathExists(fullPath)) {
      console.log(`🔄 Processing directory: ${fullPath}`);
      await processDirectory(fullPath);
    }
  }
  console.log('✅ Asset conversion completed successfully.');
}

main().catch((err) => console.error('❌ Error running conversion script:', err));
