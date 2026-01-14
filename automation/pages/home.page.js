import { expect } from "@playwright/test";
export class HomePage {
  constructor(page) {
    this.page = page;
    this.logIn = page?.locator('a[href="/login"]');
    this.logoutBtn = page?.getByRole('link', { name: 'Logout'});
    this.deleteAcctLink = page?.locator('a[href="/delete_account"]');
    this.contactFmLink = page?.locator('a[href="/contact_us"]');
    this.plpLink = page?.locator('a[href="/products"]');
    this.cartLink = page?.locator('a[href="/view_cart"]');
  }

  async navigateToHomePage() {
    await this.page.goto('https://automationexercise.com/');
  }

  async navigateToLoginPage() {
    await expect(this.logIn).toBeVisible();
    await this.logIn.click();
  }

  async deleteAccount() {
    await expect(this.deleteAcctLink).toBeVisible();
    await this.deleteAcctLink.click();
    await expect(this.page).toHaveURL(/(delete_account)/g);
  }

  async navigateToContactPage() {
    await expect(this.contactFmLink).toBeVisible();
    await this.contactFmLink.click();
    await expect(this.page).toHaveURL(/(contact_us)/g);
  }

  async navigateToPLP() {
    await expect(this.plpLink).toBeVisible();
    await this.plpLink.click();
    await expect(this.page).toHaveURL(/(products)/g);
  }

  async navigateToCartPage() {
    await expect(this.cartLink.first()).toBeVisible(); // there are two cart links, select the first one to navigate to cart page
    await this.cartLink.first().click();
    await expect(this.page).toHaveURL(/(view_cart)/g);
  }

  async logoutUser() {
    await this.logoutBtn.click();
    await expect(this.page).toHaveURL(/(login)/g); // check page is redirected to login page after user is logged out
  }
}

