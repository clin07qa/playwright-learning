import { test, expect } from '@playwright/test';
import { userInfo, validUserForLogin, invalidUser } from './test-data.js';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
});

test.describe('Test 1: Check Register User', () => {
  test('register user', async ({ page }) => { 
    await expect(page?.locator('#header')).toBeVisible(); // wait for header to be visible
    const signUpHref = await page?.locator('a[href="/login"]'); // get sign up link
    await expect(signUpHref).toBeVisible(); // wait for sign up link to be visible
    signUpHref.click();

    // fill in the registration form
    const nameInput = await page?.locator('[data-qa*="signup-name"]'); // get name input field
    const emailInput = await page?.locator('[data-qa*=signup-email]'); // get email input field

    await expect(nameInput).toBeVisible(); // wait for name input field to be visible
    await nameInput.fill(userInfo.userName); // fill in name input field
    await expect(emailInput).toBeVisible(); // wait for email input field to be visible
    await emailInput.fill(userInfo.email); // fill in email input field

    // click sign up button to enter registration page
    const signUpBtn = await page?.locator('[data-qa*="signup-button"]');
    signUpBtn.click();

    await expect(page).toHaveURL(/(signup)/g); // check that the URL is correct
    await expect(page?.locator('div[class="login-form"] > h2')).toHaveText('Enter Account Information'); // check that the registration page is loaded
    
    // fill in account information

    // fill in title
    const titleIds = ['id_gender1', 'id_gender2'];
    const randomNum = Math.floor(Math.random() * titleIds.length);
    const titleRadioBtn = await page?.locator(`input#${titleIds[randomNum]}`); // get random title radio button
    await expect(titleRadioBtn).toBeVisible(); // wait for title radio button to be visible
    titleRadioBtn.check(); // check the random title radio button
    await expect(titleRadioBtn).toBeChecked(); // check that the random title radio button is checked

    // check that username and email fields are filled in
    const nameField = await page?.locator('input#name')
    const emailField = await page?.locator('input#email');
    await expect(nameField).toBeVisible();
    await expect(nameField).toHaveValue(userInfo.userName);
    await expect(emailField).toBeVisible();
    await expect(emailField).toHaveValue(userInfo.email);

    await expect(page?.locator('input#password')).toBeVisible(); // wait for password input field to be visible
    await page?.locator('input#password').fill(userInfo.password); // fill in password input field

    const daySelect = await page?.locator('select#days');
    const monthSelect = await page?.locator('select#months');
    const yearSelect = await page?.locator('select#years');

    daySelect.selectOption(userInfo.day); // select day from dropdown
    await expect(daySelect).toHaveValue(userInfo.day); // check that the day is selected
    monthSelect.selectOption(userInfo.month); // select month from dropdown
    await expect(monthSelect).toHaveValue(userInfo.month); // check that the month is selected
    yearSelect.selectOption(userInfo.year); // select year from dropdown
    await expect(yearSelect).toHaveValue(userInfo.year); // check that the year is selected

    const signUpCheckbox = await page?.locator('input#newsletter');
    const optInCheckbox = await page?.locator('input#optin');
    await expect(signUpCheckbox).toBeVisible();
    await signUpCheckbox.check();
    await expect(signUpCheckbox).toBeChecked();
    await expect(optInCheckbox).toBeVisible();
    await optInCheckbox.check();
    await expect(optInCheckbox).toBeChecked();

    // fill in address information
    const fNameInput = await page?.locator('input#first_name');
    const lNameInput = await page?.locator('input#last_name');
    const companyInput = await page?.locator('input#company');
    const address1Input = await page?.locator('input#address1');
    const address2Input = await page?.locator('input#address2');
    const countrySelect = await page?.locator('select#country');
    const stateInput = await page?.locator('input#state');
    const cityInput = await page?.locator('input#city');
    const zipCodeInput = await page?.locator('input#zipcode');
    const phoneInput = await page?.locator('input#mobile_number');

    await expect(fNameInput).toBeVisible();
    await fNameInput.fill(userInfo.fName); 
    await expect(fNameInput).toHaveValue(userInfo.fName); 
    await expect(lNameInput).toBeVisible();
    await lNameInput.fill(userInfo.lName); 
    await expect(lNameInput).toHaveValue(userInfo.lName);
    await expect(companyInput).toBeVisible();
    await companyInput.fill(userInfo.company);
    await expect(companyInput).toHaveValue(userInfo.company);
    await expect(address1Input).toBeVisible();
    await address1Input.fill(userInfo.address1);
    await expect(address2Input).toBeVisible();
    await address2Input.fill(userInfo.address2);
    await expect(countrySelect).toBeVisible();
    await countrySelect.selectOption(userInfo.country);
    await expect(countrySelect).toHaveValue(userInfo.country);
    await expect(stateInput).toBeVisible();
    await stateInput.fill(userInfo.state);
    await expect(stateInput).toHaveValue(userInfo.state);
    await expect(cityInput).toBeVisible();
    await cityInput.fill(userInfo.city);
    await expect(cityInput).toHaveValue(userInfo.city);
    await expect(zipCodeInput).toBeVisible();
    await zipCodeInput.fill(userInfo.zipCode);
    await expect(zipCodeInput).toHaveValue(userInfo.zipCode);
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill(userInfo.phoneNum);
    await expect(phoneInput).toHaveValue(userInfo.phoneNum);

    await expect(page?.locator('button[data-qa="create-account"]')).toBeVisible();
    await page?.locator('button[data-qa="create-account"]').click();

    const continueBtn = expect(page.locator('a[data-qa="continue-button"]'));
    await expect(page).toHaveURL(/(account_created)/g); // validate account create success page
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    const deleteAcctLink = await expect(page).locator('a[href="/delete_account"]');
    await expect(deleteAcctLink).toBeVisible();
    await deleteAcctLink.click();

    await expect(page).toHaveText(/(Account Deleted!)/g);
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();
  });
});

test.describe('Test 2: Check Login User with valid email and password', () => {
  test('login user', async ({ page }) => {
    const loginUrl = await page?.locator('a[href="/login"]');
    loginUrl.click();

    // log in with valid email and password
    const emailInput = await page?.locator('input[data-qa="login-email"]');
    const passwordInput = await page?.locator('input[data-qa="login-password"]');
    const loginBtn = await page?.locator('button[data-qa="login-button"]');

    await expect(emailInput).toBeVisible();
    await emailInput.fill(validUserForLogin.email);
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(validUserForLogin.password);
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    // check that the user is logged in
    await expect(page).locator('a[href="/logout"]').toBeVisible();
    await expect(page).locator('a[href="/delete_account"]').toBeVisible();
    
    // log out user
    await expect(page.locator('a[href="/logout"]')).click();
    await expect(loginUrl).toBeVisible(); //user is log out and redirect to login page
  });
});

test.describe('Test 3: Check Login User with invalid email and password', () => {
  test('login with invalid email and password', async ({ page }) => {
    const signUpHref = await page?.locator('a[href="/login"]');
    signUpHref.click();

    const emailInput = await page?.locator('input[data-qa="login-email"]');
    const passwordInput = await page?.locator('input[data-qa="login-password"]');
    const loginBtn = await page?.locator('button[data-qa="login-button"]');

    await expect(emailInput).toBeVisible();
    await emailInput.fill(invalidUser.email);
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(invalidUser.password);
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    // validate error login message
    await expect(page?.locator('div[class="login-form"]'))?.toHaveText(/(Your email or password is incorrect!)/g);
  });
});

test.describe('Test 4: Register User with existing email', () => {
  test('register with existing email', async ({ page }) => {
    const loginUrl = await page?.locator('a[href="/login"]');
    loginUrl.click();

    const nameInput = await page?.locator('[data-qa*="signup-name"]');
    const emailInput = await page?.locator('[data-qa*=signup-email]');

    await expect(nameInput).toBeVisible();
    await nameInput.fill(validUserForLogin.userName);
    await expect(emailInput).toBeVisible();
    await emailInput.fill(validUserForLogin.email);

    // validate existing email error message
    await expect(page?.locator('div[class="signup-form"]'))?.toHaveText(/(Email Address already exist!)/g);
  });
});

test.describe('Test 5: Contact Us Form', () => {
  test('validate contact us form', async ({ page }) => {
    const contactFm = await page?.locator('a[href="/contact_us"]');
    contactFm.click();

    const nameInput = await page?.locator('input[data-qa="name"]');
    const emailInput = await page?.locator('input[data-qa="email"]');
    const subjectInput = await page?.locator('input[data-qa="subject"]');
    const messageInput = await page?.locator('textarea[data-qa="message"]');
    const submitBtn = await page?.locator('input[data-qa="submit-button"]');

    await expect(nameInput).toBeVisible();
    await nameInput.fill(validUserForLogin.userName);
    await expect(emailInput).toBeVisible();
    await emailInput.fill(validUserForLogin.email);
    await expect(subjectInput).toBeVisible();
    await subjectInput.fill('Test Subject');
    await expect(messageInput).toBeVisible();
    await messageInput.fill(validUserForLogin.message);
    await submitBtn.click();

    // unable to validate dialog, skip for now
    // page.on('dialog', async dialog => {
    //   console.log(dialog.message());
    //   await dialog.accept();
    // });

    //await expect(page)?.locator('div[class="contact-form"]')?.toHaveText(/(Success! Your details have been submitted successfully.)/g);
  });
});
test.describe('Test 6: Verify PLP link and product details in PDP', () => {
  test('validate PLP and PDP', async ({ page }) => {
    const productsLink = await page?.locator('a[href="/products"]');
    await expect(productsLink).toBeVisible();
    await productsLink.click(); // navigate to product landing page

    // select and click a random product card
    const allProductsContainer = await page?.locator('div[class="features_items"]');
    const numProductCards = await allProductsContainer.locator('.product-image-wrapper').count();
    const randomProductIndex = Math.floor(Math.random() * numProductCards);
    const randomProductCard = allProductsContainer.locator('.product-image-wrapper').nth(randomProductIndex);

    await expect(randomProductCard.locator('li > a')).toBeVisible();
    await randomProductCard.locator('li > a').click(); // navigate to product detail page

    // validate PDP url, product name, cateogry in PDP
    await expect(page).toHaveURL(/(product_details)/g);
    const pdpWrapper = await page?.locator('div[class="product-information"]');
    await pdpWrapper?.locator('h2').toBeVisible(); // check product name is visible
    await pdpWrapper?.locator('p').toHaveText(/(Category:)/g); // check product category is visible
  });
});
test.describe('Test 7: PDP - product qty drop down & Add to Cart', () => {
  test('validate qty dropdown and add to cart', async ({ page }) => {
    const productsLink = await page?.locator('a[href="/products"]');
    await expect(productsLink).toBeVisible();
    await productsLink.click(); // navigate to product landing page

    const allProductsContainer = await page?.locator('div[class="features_items"]');
    const numProductCards = await allProductsContainer.locator('.product-image-wrapper').count();
    const randomProductIndex = Math.floor(Math.random() * numProductCards);
    const randomProductCard = allProductsContainer.locator('.product-image-wrapper').nth(randomProductIndex);

    await expect(randomProductCard.locator('li > a')).toBeVisible();
    await randomProductCard.locator('li > a').click(); // navigate to product detail page

    // validate qty dropdown - increase and decrease qty
    const randomQty = Math.floor(Math.random() * 10) + 2; // random qty between 2 and 10
    const qtyInput = await page?.locator('#quantity');
    await qtyInput.fill(randomQty.toString());
    await expect(qtyInput).toHaveValue(randomQty.toString()) // validate that the qty is set correctly

    // validate add to cart and success message
    const addToCartBtn = await page?.locator('button[class="btn btn-default cart"]');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click(); // click add to cart button
    // await expect(page.locator('h4')).toHaveText('Added!'); having issues with success message dialog, skip for now
    await page.goto('https://www.automationexercise.com/'); // navigate back to home page
    const cartLink = await page?.locator('a[href="/view_cart"]');
    await cartLink.first().click(); // unsure why there are two view cart links, but this would select cart link in heaader
    const cartItemContainer = await page?.locator('#cart_info_table');
    const cartItemsCount = await cartItemContainer.locator('tr').count();
    expect(cartItemsCount).toBeGreaterThan(0); // check that item is added to cart from PDP
  });
});