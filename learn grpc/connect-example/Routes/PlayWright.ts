import { chromium } from "playwright";
import type { Page, Browser } from "playwright";

export async function startPriceStream(
  ticker: string,
  onPrice: (price: string) => void
) {
  console.log("Starting stream for:", ticker);

  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();
  const url = `https://www.tradingview.com/symbols/${ticker}/?exchange=BINANCE`;
  console.log(`[Playwright] Opening ${url}`);
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Updated selector
  const priceSelector = 'span.js-symbol-last';
        
  await page.waitForSelector(priceSelector, { timeout: 60000 });
    
  await page.exposeFunction("priceUpdated", (price: string) => {
    const cleanPrice = price.replace(/\s/g, '');
    console.log(`[Playwright] ${ticker} price: ${cleanPrice}`);
    onPrice(cleanPrice);
  });

  await page.evaluate((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
  
    const observer = new MutationObserver(() => {
      // Send updated price back to Node
      // @ts-ignore
      window.priceUpdated(el.textContent?.replace(/\s/g,'') || '');
    });
  
    // Observe text changes as well
    observer.observe(el, { childList: true, subtree: true, characterData: true });
  
    // Emit initial price
    // @ts-ignore
    window.priceUpdated(el.textContent?.replace(/\s/g,'') || '');
  }, priceSelector);
  

  return { browser, page };
}
