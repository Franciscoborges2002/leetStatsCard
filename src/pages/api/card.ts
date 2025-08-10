import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-core';

const VIEWPORTS: Record<string, { width: number; height: number }> = {
  minimal: { width: 960, height: 390 },
  classic: { width: 960, height: 480 },
  summary: { width: 960, height: 600 },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query as Record<string, string>;
  const cardType = query.card || 'minimal';
  const viewport = VIEWPORTS[cardType] || VIEWPORTS['minimal'];
  const params = new URLSearchParams(query).toString();
  const url = `http://app:3000/card?${params}`;

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSERLESS_URL || 'ws://localhost:3001',
      //browserURL: "http://localhost:3001"
    });

    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: 'networkidle0' });

    const card = await page.$('#minimalCard');
    if (!card) {
      await browser.close();
      return res.status(404).send('Card element not found');
    }

    const buffer = await card.screenshot({ type: 'png' });

    await browser.close();

    if (buffer) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).send(buffer);
    } else {
      return res.status(500).json({ error: 'Could not capture screenshot' });
    }
  } catch (err: unknown) {
    console.error('Puppeteer error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
