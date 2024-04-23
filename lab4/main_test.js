const puppeteer = require('puppeteer');

(async () => {
  // Launch Chrome
  const browser = await puppeteer.launch();
  /*
  const browser = await puppeteer.launch({ 
    headless: false // Set the browser to be visible
  });
  */
  // Open a new page
  const page = await browser.newPage(); 
  // Navigate to the target URL
  await page.goto('https://pptr.dev/'); 

  // Wait for the search bar container element to appear
  await page.waitForSelector('.navbarSearchContainer_Bca1');

  // Click on the search button
  await page.click('button.DocSearch.DocSearch-Button');

  // Wait for the search bar input element to appear
  await page.waitForSelector('.DocSearch-Input');

  // Find the input box inside the search bar
  const input = await page.$('.DocSearch-Input');

  // Enter the search term into the search bar
  await input.type('chipi chipi chapa chapa'); 

  // Wait for the search results to appear
  await page.waitForSelector('.DocSearch-Hit');

  // Click on the first result in the "Docs" section
  //await page.waitForSelector('li[id="docsearch-item-5"] a');
  await page.click("#docsearch-item-5");

  // Wait for the h1 element to appear and assign it to a variable
  const h1Element = await page.waitForSelector('h1');

  // Use evaluate to extract the title text

  const fullTitle = await h1Element?.evaluate(el => el.textContent); 
  // Print the title
  console.log(fullTitle); 

  await browser.close();
})();
