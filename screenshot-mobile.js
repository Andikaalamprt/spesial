const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeMobileScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // iPhone 14 Pro size
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(1500);

  // 1. Loading Screen (mobile)
  console.log('1. Mobile Loading Screen...');
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-01-loading.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // Wait for loading to finish
  await sleep(3000);

  // 2. Welcome Overlay (mobile)
  console.log('2. Mobile Welcome Overlay...');
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-02-welcome.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // Tap to dismiss
  await page.touchscreen.tap(195, 422);
  await sleep(2000);

  // 3. Hero Section (mobile)
  console.log('3. Mobile Hero Section...');
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-03-hero.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // Check if hero text is visible
  const heroText = await page.evaluate(() => {
    const h = document.querySelector('.hero-greeting');
    return h ? h.textContent : 'NOT FOUND';
  });
  console.log(`   Hero greeting: "${heroText}"`);

  // Check if particles are visible
  const particles = await page.evaluate(() => {
    const p = document.querySelectorAll('.particle');
    return p.length;
  });
  console.log(`   Particles count: ${particles}`);

  // 4. Love Letter (mobile)
  console.log('4. Mobile Love Letter...');
  await page.evaluate(() => {
    document.getElementById('love-letter')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(4000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-04-loveletter.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 5. Gallery (mobile)
  console.log('5. Mobile Gallery...');
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-05-gallery.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 6. Reasons (mobile)
  console.log('6. Mobile Reasons...');
  await page.evaluate(() => {
    document.getElementById('reasons')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-06-reasons.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 7. Countdown (mobile)
  console.log('7. Mobile Countdown...');
  await page.evaluate(() => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-07-countdown.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 8. Quotes (mobile)
  console.log('8. Mobile Quotes...');
  await page.evaluate(() => {
    document.getElementById('quotes')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-08-quotes.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 9. Proposal (mobile)
  console.log('9. Mobile Proposal...');
  await page.evaluate(() => {
    document.getElementById('proposal')?.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(1000);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-09-proposal.png'),
    fullPage: false,
  });
  console.log('   ✓ Done');

  // 10. Full page mobile
  console.log('10. Mobile Full Page...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-10-fullpage.png'),
    fullPage: true,
  });
  console.log('   ✓ Done');

  console.log('\n📱 Mobile screenshots saved!');
  console.log(`🔍 Console errors/warnings: ${consoleErrors.length > 0 ? consoleErrors.join(', ') : 'None ✅'}`);

  await browser.close();
}

takeMobileScreenshots().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
