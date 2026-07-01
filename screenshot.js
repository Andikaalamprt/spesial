const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(1000);

  // 1. Loading Screen
  console.log('1. Capturing Loading Screen...');
  await sleep(800);
  await page.screenshot({
    path: path.join(screenshotDir, '01-loading-screen.png'),
    fullPage: false,
  });
  console.log('   ✓ Loading screen captured');

  // Wait for loading screen to finish (3s) and welcome overlay to appear
  console.log('2. Waiting for welcome overlay...');
  await sleep(3000);

  // Welcome Overlay
  console.log('3. Capturing Welcome Overlay...');
  await page.screenshot({
    path: path.join(screenshotDir, '02-welcome-overlay.png'),
    fullPage: false,
  });
  console.log('   ✓ Welcome overlay captured');

  // Click to dismiss overlay - try multiple approaches
  console.log('4. Dismissing welcome overlay...');
  try {
    // Try clicking the center of the page first
    await page.mouse.click(720, 450);
    await sleep(500);
    
    // Check if overlay is gone by looking for the hero section
    const heroVisible = await page.evaluate(() => {
      const hero = document.querySelector('.hero-greeting');
      return hero ? hero.textContent : null;
    });
    console.log(`   Hero text found: "${heroVisible}"`);
  } catch (err) {
    console.log('   Click approach failed, trying alternative...');
    await page.evaluate(() => {
      // Force dismiss the overlay by simulating the click handler
      const overlay = document.querySelector('.music-overlay');
      if (overlay) overlay.click();
    });
    await sleep(1000);
  }

  await sleep(2000);

  // 3. Hero Section
  console.log('5. Capturing Hero Section...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, '03-hero-section.png'),
    fullPage: false,
  });
  console.log('   ✓ Hero section captured');

  // 4. Love Letter - scroll to it
  console.log('6. Capturing Love Letter...');
  await page.evaluate(() => {
    document.getElementById('love-letter')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(4000); // Wait for typing animation
  await page.screenshot({
    path: path.join(screenshotDir, '04-love-letter.png'),
    fullPage: false,
  });
  console.log('   ✓ Love letter captured');

  // 5. Gallery
  console.log('7. Capturing Gallery...');
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1500);
  await page.screenshot({
    path: path.join(screenshotDir, '05-gallery.png'),
    fullPage: false,
  });
  console.log('   ✓ Gallery captured');

  // 6. Reasons
  console.log('8. Capturing Reasons...');
  await page.evaluate(() => {
    document.getElementById('reasons')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1500);
  await page.screenshot({
    path: path.join(screenshotDir, '06-reasons.png'),
    fullPage: false,
  });
  console.log('   ✓ Reasons captured');

  // 7. Countdown
  console.log('9. Capturing Countdown...');
  await page.evaluate(() => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, '07-countdown.png'),
    fullPage: false,
  });
  console.log('   ✓ Countdown captured');

  // 8. Quotes
  console.log('10. Capturing Quotes...');
  await page.evaluate(() => {
    document.getElementById('quotes')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, '08-quotes.png'),
    fullPage: false,
  });
  console.log('   ✓ Quotes captured');

  // 9. Proposal
  console.log('11. Capturing Proposal...');
  await page.evaluate(() => {
    document.getElementById('proposal')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1500);
  await page.screenshot({
    path: path.join(screenshotDir, '09-proposal.png'),
    fullPage: false,
  });
  console.log('   ✓ Proposal captured');

  // 10. Full page screenshot
  console.log('12. Capturing Full Page...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, '10-full-page.png'),
    fullPage: true,
  });
  console.log('   ✓ Full page captured');

  console.log('\n📸 All 10 screenshots saved to screenshots/ directory!');
  if (consoleErrors.length > 0) {
    console.log('\n⚠️ Console errors found:', consoleErrors);
  } else {
    console.log('✅ No console errors detected');
  }

  await browser.close();
}

takeScreenshots().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
