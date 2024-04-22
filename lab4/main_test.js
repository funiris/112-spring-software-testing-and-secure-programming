const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    }); // 打開chrome
    const page = await browser.newPage(); // 打開一個分頁

    await page.goto('https://pptr.dev/');

    // 等待搜索框父元素出现
    await page.waitForSelector('.navbarSearchContainer_Bca1');

    // 在搜索框父元素下查找按钮元素
    // 1. Find the button element in the search bar parent element
    console.log('Step 1: Finding the button element');
    const button = await page.$('.navbarSearchContainer_Bca1 button.DocSearch');
    if (button) {
      console.log('Step 1: Button element found');
    } else {
      console.error('Step 1: Button element not found');
    }
    // 点击按钮
    console.log('Step 2: Clicking the button');
    await button.click();

    // 等待搜索框内部的元素出现
    console.log('Step 3: Waiting for the element inside the search bar');
    await page.waitForSelector('.DocSearch-Input');
    console.log('Step 3: Element inside the search bar found');

    // 在搜索框内部查找输入框
    console.log('Step 4: Finding the input box inside the search bar');
    const input = await page.$('.DocSearch-Input');
    if (input) {
      console.log('Step 4: Input box found');
    } else {
      console.error('Step 4: Input box not found');
    }

    // 在搜索框内部输入关键词
    console.log('Step 5: Entering the keyword in the search bar');
    await input.type('chipi chipi chapa chapa');
    console.log('Step 5: Keyword entered');

    // scroll
    console.log('Step 6: Scrolling to the search results list');
    const element = await page.$('#docsearch-list');
    await element.scrollIntoView('#docsearch-list');
    console.log('Step 6: Scrolled to the search results list');

    console.log('Step 7: Clicking the target element (docsearch-item-5)');
    async function clickTargetElement() {
        try {
            // 使用 CSS 选择器定位目标元素
            const targetElement = await page.$('#docsearch-item-5');

            // 点击目标元素
            await targetElement.click();
            console.log('已点击目标元素');
        } catch (error) {
            console.error('点击元素错误:', error);
        }
    }

     const searchResultSelector = '.devsite-result-item-link';
     
     console.log('Step 8: Waiting for the search results box to appear');
     const searchResultsBox = await page.waitForSelector('#docsearch-item-5');
     if (searchResultsBox) {
       console.log('Step 8: Search results box found');
     } else {
       console.error('Step 8: Search results box not found');
     }
    // 等待結果框
      
      // Wait for 2 seconds before clicking the result item title
     console.log('Step 9: Waiting for 2 seconds');
     await new Promise(resolve => setTimeout(resolve, 2000));
     console.log('Step 9: 2 seconds passed');
/*
      //单击第一个结果项标题可使用 id 属性或 DocSearch-Hit-title 或 DocSearch-Hit-path 类，定位标题或路径元素DocSearch-Hit-title 或 DocSearch-Hit-path
      const firstResultTitle = await page.evaluate(() => {
        return element.querySelector('#docsearch-item-5 .DocSearch-Hits:nth-child(2)');
      });
    */

    console.log('Step 10: Clicking the search results box');
    await searchResultsBox.click();
    const isVisible = await searchResultsBox.isVisible();
    if (isVisible) {
      console.log('SearchResultsBox 元素可见');
    } else {
      console.log('SearchResultsBox 元素不可见');
    }
    console.log('Step 10: Search results box clicked');
    /*
      //Replace with actual ID or calass
      const titleElement = await page.waitForSelector('#docsearch-item-5 .DocSearch-Hits:nth-child(2)'); 

      await titleElement.click();
    */
    // Get the page title
    console.log('Step 11: Getting the page title');
    const title = await page.title();
    console.log('Step 11: Page title:', title);

    // Print the title to the console
    console.log('Step 12: Printing the title to the console');
    console.log(title);

    await browser.close();
})();
