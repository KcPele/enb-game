import { createCanvas } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';

// Generate preview image (3:2 aspect ratio)
const previewCanvas = createCanvas(1200, 800);
const previewCtx = previewCanvas.getContext('2d');

// Set background with gradient
const gradient = previewCtx.createLinearGradient(0, 0, 1200, 800);
gradient.addColorStop(0, '#0f172a');
gradient.addColorStop(1, '#000000');
previewCtx.fillStyle = gradient;
previewCtx.fillRect(0, 0, 1200, 800);

// Draw title
previewCtx.fillStyle = '#ffffff';
previewCtx.font = 'bold 72px Arial';
previewCtx.textAlign = 'center';
previewCtx.fillText('Base Mini App', 600, 300);

// Draw subtitle with gradient
const textGradient = previewCtx.createLinearGradient(400, 0, 800, 0);
textGradient.addColorStop(0, '#22d3ee');
textGradient.addColorStop(1, '#3b82f6');
previewCtx.fillStyle = textGradient;
previewCtx.font = '36px Arial';
previewCtx.fillText('Mint your NFT on Base', 600, 400);

// Save preview image
const previewBuffer = previewCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(process.cwd(), 'public', 'preview.png'), previewBuffer);

// Generate splash image (200x200)
const splashCanvas = createCanvas(200, 200);
const splashCtx = splashCanvas.getContext('2d');

// Set background
splashCtx.fillStyle = '#000000';
splashCtx.fillRect(0, 0, 200, 200);

// Draw logo/icon
splashCtx.fillStyle = '#22d3ee';
splashCtx.beginPath();
splashCtx.arc(100, 100, 60, 0, Math.PI * 2);
splashCtx.fill();

splashCtx.fillStyle = '#ffffff';
splashCtx.font = 'bold 24px Arial';
splashCtx.textAlign = 'center';
splashCtx.fillText('Base', 100, 110);

// Save splash image
const splashBuffer = splashCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(process.cwd(), 'public', 'splash.png'), splashBuffer);

// Generate icon image (200x200)
const iconCanvas = createCanvas(200, 200);
const iconCtx = iconCanvas.getContext('2d');

// Set background
iconCtx.fillStyle = '#000000';
iconCtx.fillRect(0, 0, 200, 200);

// Draw icon (similar to splash but with different styling)
iconCtx.fillStyle = '#3b82f6';
iconCtx.beginPath();
iconCtx.arc(100, 100, 70, 0, Math.PI * 2);
iconCtx.fill();

iconCtx.fillStyle = '#ffffff';
iconCtx.font = 'bold 28px Arial';
iconCtx.textAlign = 'center';
iconCtx.fillText('Base', 100, 110);

// Save icon image
const iconBuffer = iconCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.png'), iconBuffer);
