import { createCanvas } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';

// Create a 600x600 canvas
const canvas = createCanvas(600, 600);
const ctx = canvas.getContext('2d');

// Set background
ctx.fillStyle = '#1f2937'; // dark gray background
ctx.fillRect(0, 0, 600, 600);

// Draw title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 48px Arial';
ctx.textAlign = 'center';
ctx.fillText('Snake Game', 300, 150);

// Draw subtitle
ctx.font = '24px Arial';
ctx.fillText('0.0001 USDC to Play', 300, 200);

// Draw snake preview
const snakeSegments = [
  { x: 250, y: 300 },
  { x: 230, y: 300 },
  { x: 210, y: 300 },
  { x: 190, y: 300 },
];

// Draw snake
ctx.fillStyle = '#22c55e'; // green
for (const segment of snakeSegments) {
  ctx.fillRect(segment.x, segment.y, 20, 20);
}

// Draw food
ctx.fillStyle = '#ef4444'; // red
ctx.beginPath();
ctx.arc(350, 300, 10, 0, Math.PI * 2);
ctx.fill();

// Draw instructions
ctx.fillStyle = '#ffffff';
ctx.font = '20px Arial';
ctx.fillText('Use arrow keys to control the snake', 300, 400);
ctx.fillText('Collect food to grow longer', 300, 430);

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(process.cwd(), 'public', 'snake-game-preview.png'), buffer);
