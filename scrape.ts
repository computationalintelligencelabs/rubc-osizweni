import puppeteer from 'puppeteer';
import fs from 'fs';

const urls = [
  "https://divine-presence.replit.app/",
  "https://divine-presence.replit.app/about",
  "https://divine-presence.replit.app/events",
  "https://divine-presence.replit.app/blog",
  "https://divine-presence.replit.app/the-power-and-value-of-a-family-part-2",
  "https://divine-presence.replit.app/the-power-and-value-of-a-family",
  "https://divine-presence.replit.app/the-will-of-god"
];

async function scrape() {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    const results: Record<string, string> = {};
    
    for (const url of urls) {
      await page.goto(url, { waitUntil: 'networkidle0' });
      const html = await page.content();
      const path = new URL(url).pathname.replace(/\//g, '_') || '_home';
      fs.writeFileSync(`scraped${path}.html`, html);
      console.log(`Scraped ${url}`);
    }
    
    await browser.close();
    console.log('Scraping complete');
  } catch (e) {
    console.error(e);
  }
}

scrape();
