import { expect } from "@playwright/test";
import { HomePage } from "./home.page";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginLink = page?.locator('a[href="/login"]');
        this.logoutLink = page?.getByRole('link', { name: ' Logout' });
        this.loginForm = page?.locator('div[class="login-form"]');
        this.signUpForm = page?.locator('div[class="signup-form"]');
        this.loginEmailInput = page?.locator('input[data-qa="login-email"]');
        this.loginPasswordInput = page?.locator('input[data-qa="login-password"]');
        this.loginBtn = page?.locator('button[data-qa="login-button"]'); 
        this.signUpNameInput = page?.locator('input[data-qa="signup-name"]');
        this.signUpEmailInput = page?.locator('input[data-qa="signup-email"]');
        this.signUpBtn = page?.locator('[data-qa*="signup-button"]')
    }

    async navigateToLoginPage() {
        await this.loginLink.click();
    }

    async navigateToRegisterPage(userName, email, isRegisteredUser) {
        await this.signUpNameInput?.fill(userName);
        await this.signUpEmailInput?.fill(email);
        await this.signUpBtn?.click();

        if (isRegisteredUser) {
            await expect(this.signUpForm).toHaveText(/(Email Address already exist!)/g);
        } else {
            await expect(this.page)?.toHaveURL(/(signup)/g); // check that the URL is correct
            await expect(this.page?.locator('div[class="login-form"] > h2')).toHaveText('Enter Account Information'); // check that the registration page is loaded
        }
    }

    async login(email, password, isValidUser) {
        const homePage = new HomePage(this.page);
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginBtn.click();
        if (isValidUser) {
            await expect(homePage.logoutBtn).toBeVisible();
            await homePage.logoutUser();
        } else {
            expect(this.loginForm)?.toHaveText(/(Your email or password is incorrect!)/g);
        }
    }
}