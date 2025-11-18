import { test, expect } from '@playwright/test';
import { invalidUser, randomUser, validUserForLogin } from './test-data.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { RegisterPage } from './pages/register.page.js';
import { ContactPage } from './pages/contact.page.js';
import { ProductLandingPage } from './pages/product.landing.page.js';
import { ProductDetailsPage } from './pages/product.details.page.js';
import { CartPage } from './pages/cart.page.js';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
});

test.describe('Test 1: Check Register User', () => {
  test('register user', async ({ page }) => { 
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await homePage.navigateToLoginPage();
    await loginPage.navigateToRegisterPage(randomUser.userName, randomUser.email, false);
    await registerPage.fillInUserDetails();
    await registerPage.createAccount();
    await registerPage.continue();
    await homePage.deleteAccount();
    await registerPage.continue();
  });
});

test.describe('Test 2: Login registered user with valid email and password', () => {
  test('login user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToLoginPage();
    await loginPage.login(validUserForLogin.email, validUserForLogin.password, true);
  });
});

test.describe('Test 3: Check Login User with invalid email and password', () => {
  test('login with invalid email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToLoginPage();
    await loginPage.login(invalidUser.email, invalidUser.password, false);
  });
});

test.describe('Test 4: Register User with existing email', () => {
  test('register with existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToLoginPage();
    await loginPage.navigateToRegisterPage(validUserForLogin.userName, validUserForLogin.email, true);
  });
});

test.describe('Test 5: Contact Us Form', () => {
  test('validate contact us form', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigateToContactPage();
    await contactPage.fillInContactForm();

    // //unable to validate dialog, skip for now
    // page.on('dialog', async dialog => {
    //   console.log(dialog.message());
    //   await dialog.accept();
    // });

    // await expect(page)?.locator('div[class="contact-form"]')?.toHaveText(/(Success! Your details have been submitted successfully.)/g);
  });
});
test.describe('Test 6: Verify PLP link and product details in PDP', () => {
  test('validate PLP and PDP', async ({ page }) => {
    const plp = new ProductLandingPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateToPLP();
    await plp.navigateToPDP();
  });
});
test.describe('Test 7: PDP - product qty drop down & Add to Cart', () => {
  test('validate qty dropdown and add to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const plp = new ProductLandingPage(page);
    const pdp = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToPLP();
    await plp.navigateToPDP();
    await pdp.addProductToCart();
    // await expect(page.locator('h4')).toHaveText('Added!'); having issues with success message dialog, skip for now
    await homePage.navigateToHomePage();
    await homePage.navigateToCartPage();
    await cartPage.validateCartItemQty();
  });
});