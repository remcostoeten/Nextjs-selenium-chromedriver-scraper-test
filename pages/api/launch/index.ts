// pages/api/scrapeHeader.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { JSDOM } from 'jsdom';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  await driver.get('https://remcostoeten.com');
  let bodyHTML = await driver.findElement(By.tagName('body')).getAttribute('innerHTML');
  await driver.quit();

  // Parse the HTML with JSDOM and extract the header tag
  const dom = new JSDOM(bodyHTML);
  const headerHTML = dom.window.document.querySelector('header')?.outerHTML || '';

  res.status(200).json({ headerHTML });
}