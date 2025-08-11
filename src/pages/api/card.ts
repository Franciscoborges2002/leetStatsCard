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
    //Connect to the Browserlerss Browser
    const browser = await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSERLESS_URL || 'ws://localhost:5001',
    });

    //Create the new page
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: 'networkidle0' });

    //Go to the needed element
    const card = await page.$('#minimalCard');

    // If there is no card, return an error
    if (!card) {
      await browser.close();
      return res.status(404).send('Card element not found');
    }

    // Type of screenshot wanted
    //Type:             png   -> Have radius border
    //Fullpage:         false -> Just want the card element
    //omitBackground:   true  -> Allow screenshots with transparancy
    const buffer = await card.screenshot({ type: 'png', fullPage: false, omitBackground: true });

    //Finally close the browser
    await browser.close();

    if (buffer) {
      //Create the response
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).send(buffer);
    } else {
      //Return an error message, if there is no image to be displayed
      return res.status(500).json({ error: 'Could not get the image!' });//Screenshot could not be generated
    }
  } catch (err: unknown) {
    console.error('Puppeteer error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
