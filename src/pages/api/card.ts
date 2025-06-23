import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

const VIEWPORTS: Record<string, { width: number; height: number }> = {
  minimal: { width: 960, height: 390 },
  classic: { width: 960, height: 480 },
  summary: { width: 960, height: 600 },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query as Record<string, string>
  const cardType = query.card || 'minimal'
  console.log(query.card)
  const viewport = VIEWPORTS[cardType] || VIEWPORTS['minimal']
  const params = new URLSearchParams(query).toString()

  const url = `http://localhost:3000/card?${params}`

  console.log(url)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.goto(url, { waitUntil: 'networkidle0' })
  const card = await page.$('#minimalCard')
  if (!card) {
    await browser.close()
    return res.status(404).send('Card element not found')
  }
  const buffer = await card?.screenshot({ type: 'png' });

  await browser.close();

  if (buffer) {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(buffer);
  } else {
    res.status(500).json({ error: 'Could not capture screenshot' });
  }
}
