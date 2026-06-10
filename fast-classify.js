import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const assetsDir = './public/assets';

// The images we want to classify that didn't have permanent unique matches yet
const files = [
  'antesdespues.webp',
  'antesdespues4.webp',
  'antesdespues5.webp'
];

async function classifyFile(file) {
  const filePath = path.join(assetsDir, file);
  const meta = await sharp(filePath).metadata();
  const topHalfBuffer = await sharp(filePath)
    .extract({ left: 0, top: 0, width: meta.width, height: Math.floor(meta.height / 2) })
    .toBuffer();

  const base64Image = topHalfBuffer.toString('base64');

  const prompt = `Identify which of these 3 specific aesthetic treatment types is shown in this image (this is a "before" view):
- 'arrugas_case1' (Close-up of forehead lines or deep wrinkles on middle-aged forehead or front face expression wrinkles)
- 'arrugas_case4' (Crow's feet / wrinkles around the eyes area close-up)
- 'remodelacion_corporal' (Stomach, abdomen, hips, waist or thighs - a body slimming/contouring view. Look for a belly or body torso)

Answer with EXACTLY one of those strings: 'arrugas_case1', 'arrugas_case4', or 'remodelacion_corporal'. Do not provide any other text.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: [
      { text: prompt },
      { inlineData: { data: base64Image, mimeType: 'image/jpeg' } }
    ]
  });

  const category = response.text.trim().replaceAll("'", "").replaceAll('"', "");
  return { file, category };
}

async function main() {
  console.log('Starting parallel classification of remaining files...');
  
  const results = await Promise.all(files.map(file => 
    classifyFile(file).catch(err => ({ file, error: err.message }))
  ));

  console.log('Results:', results);

  // Now write the final crops based on results
  for (const res of results) {
    if (res.error) {
      console.error(`Error with ${res.file}: ${res.error}`);
      continue;
    }

    const { file, category } = res;
    const filePath = path.join(assetsDir, file);
    const meta = await sharp(filePath).metadata();
    const halfHeight = Math.floor(meta.height / 2);

    let antesName = '';
    let despuesName = '';

    if (category === 'arrugas_case1') {
      antesName = 'arrugas_antes.webp';
      despuesName = 'arrugas_despues.webp';
    } else if (category === 'arrugas_case4') {
      antesName = 'arrugas_antes4.webp';
      despuesName = 'arrugas_despues4.webp';
    } else if (category === 'remodelacion_corporal') {
      antesName = 'remodelacion_antes.webp';
      despuesName = 'remodelacion_despues.webp';
    } else {
      console.error(`Unexpected category "${category}" for ${file}`);
      continue;
    }

    const antesPath = path.join(assetsDir, antesName);
    const despuesPath = path.join(assetsDir, despuesName);

    // Save top half
    await sharp(filePath)
      .extract({ left: 0, top: 0, width: meta.width, height: halfHeight })
      .toFile(antesPath);
    console.log(`Saved top half of ${file} as ${antesName}`);

    // Save bottom half
    await sharp(filePath)
      .extract({ left: 0, top: halfHeight, width: meta.width, height: meta.height - halfHeight })
      .toFile(despuesPath);
    console.log(`Saved bottom half of ${file} as ${despuesName}`);
  }

  console.log('Finished processing.');
}

main().catch(console.error);
