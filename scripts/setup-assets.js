import fs from 'fs';
import path from 'path';

const photoDir = path.resolve('photo');
const publicDir = path.resolve('public');
const photosTargetDir = path.resolve('public/photos');
const audioTargetDir = path.resolve('public/audio');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(photosTargetDir)) fs.mkdirSync(photosTargetDir, { recursive: true });
if (!fs.existsSync(audioTargetDir)) fs.mkdirSync(audioTargetDir, { recursive: true });

// Copy photos
if (fs.existsSync(photoDir)) {
  const files = fs.readdirSync(photoDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Found ${files.length} photos in photo folder.`);
  
  files.forEach((file, idx) => {
    const srcPath = path.join(photoDir, file);
    const destPath = path.join(photosTargetDir, `photo-${idx + 1}.jpg`);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} -> photo-${idx + 1}.jpg`);
  });
} else {
  console.warn('photo directory not found');
}

console.log('Asset setup completed!');
