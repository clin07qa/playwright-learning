import { test, expect } from '@playwright/test';
import { userInfo, validColorList } from './test-data.js';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
});

test.describe('Check Register User', () => {
  test('register user', async ({ page }) => { 
    await expect(page?.locator('#header')).toBeVisible(); // wait for header to be visible
    const signUpHref = await page?.locator('a[href="/login"'); 
    await expect(signUpHref).toBeVisible(); // wait for sign up link to be visible
    signUpHref.click(); // click sign up link

    // fill in the registration form
    const nameInput = await page?.locator('[data-qa*="signup-name"]'); // get name input field
    const emailInput = await page?.locator('[data-qa*=signup-email]'); // get email input field

    await expect(nameInput).toBeVisible(); // wait for name input field to be visible
    await nameInput.fill(userInfo.name); // fill in name input field
    await expect(emailInput).toBeVisible(); // wait for email input field to be visible
    await emailInput.fill(userInfo.email); // fill in email input field
  });
});

// test.describe('check gender buttons are clickable', () => {
//   test('click random gender button', async ({ page }) => {
//     const genderRadioBtn = await page?.locator('input[name="gender"]');
//     const numRadioBtns = await genderRadioBtn.count();
//     const randomGender = await Math.floor(Math.random() * numRadioBtns);

//     for (let i = 0; i < numRadioBtns; i++) {
//       await expect(genderRadioBtn.nth(i)).toBeVisible(); // wait for each radio button to be visible
//     }

//     await genderRadioBtn.nth(randomGender).check(); // select a random radio button
//     await expect(genderRadioBtn.nth(randomGender)).toBeChecked(); // expect the selected radio button to be checked
//   });
// })

// test.describe('check checkboxes are clickable', () => {
//   test('click random checkbox', async ({ page }) => {
//     const checkBox = await page?.locator('input[type="checkbox"]');
//     const numCheckBoxes = await checkBox.count();
//     const randomGender = await Math.floor(Math.random() * numCheckBoxes);

//     for (let i = 0; i < numCheckBoxes; i++) {
//       await expect(checkBox.nth(i)).toBeVisible(); // wait for each checkbox to be visible
//     }
//     await checkBox.nth(randomGender).check(); // select a random checkbox
//     await expect(checkBox.nth(randomGender)).toBeChecked(); // expect the selected checkbox to be checked
//     await checkBox.nth(randomGender).uncheck(); // uncheck the checkbox
//   });
// });

// test.describe('check color list contains all colors in the test data', () => {
//   test('check color list', async ({ page }) => {
//     const colorElems = (await page?.locator('#colors > option').allTextContents()).map((color) => color.trim().toLowerCase());
//     await expect(colorElems).toHaveLength(validColorList.length); // check that the number of colors in the list is equal to the number of colors in the test data
//     for (const color of validColorList) {
//       await expect(colorElems).toContain(color.toLocaleLowerCase()); // check that each color in the test data is present in the list
//     }
//   });
// });

// test.describe('check dynamic button is clickable', () => {
//   test('click dynamic button', async ({ page }) => {
//     const dynamicBtn = await page?.locator('button[name="start"]');
//     await expect(dynamicBtn).toBeVisible(); // wait for dynamic button to be visible
//     await dynamicBtn.click(); // click dynamic button
//     expect(await page?.locator('button[name="stop"]').isVisible()); // check that stop button is visible
//   });
// });

// test.describe('check alert prompts', () => {
//   test('click Simple Alert', async ({ page }) => {
//     await page.once('dialog', async (dialog) => {
//       expect(dialog.message()).toBe('I am an alert box!'); // check that the alert message is correct
//       dialog.accept(); // accept the alert
//     });
//     const simpleAlertBtn = await page?.locator('#alertBtn');
//     await expect(simpleAlertBtn).toBeVisible(); // wait for simple alert button to be visible
//     await simpleAlertBtn.click(); // click simple alert button
//   });

//   test('click Confirmation Alert', async ({ page }) => {
//     await page.once('dialog', async (confirm) => {
//       expect(confirm.message()).toBe('Press a button!'); // check that the alert message is correct
//       confirm.accept(); // accept the alert
//     });
//     const confirmBtn = await page?.locator('#confirmBtn');
//     await expect(confirmBtn).toBeVisible(); // wait for simple alert button to be visible
//     await confirmBtn.click(); // click simple alert button
//   });

//   test('click Prompt Alert', async ({ page }) => {
//     const promptvalue = 'John Doe';
//     await page.once('dialog', async (prompt) => {
//       expect(prompt.message()).toBe('Please enter your name:'); // check that the alert message is correct
//       await prompt.accept(promptvalue) // accept the alert with a name
//     });
//     const promptBtn = await page?.locator('#promptBtn');
//     await expect(promptBtn).toBeVisible(); // wait for simple alert button to be visible
//     await promptBtn.click(); // click simple alert button
//     expect (page.locator('#demo')).toBeVisible();
//     expect (page.locator('#demo')).toHaveText(`Hello ${promptvalue}! How are you today?`); // check that the alert message is correct
//   });
// });

// test.describe('navigate to Udemy Courses page', () => {
//   test('click Udemy Courses link', async ({ page }) => {
//     const udemyCoursesLink = await page?.locator('a[href*="udemy-courses"]');
//     await expect(udemyCoursesLink).toBeVisible(); // wait for Udemy Courses link to be visible
//     await udemyCoursesLink.click(); // click Udemy Courses link
//     await expect(page).toHaveURL(/.*udemy-courses/g); // check that the URL is correct
//     console.log(`New page URL: ${page.url()}`); // log the URL of the new page
//   });
// });