import { randomUser } from "../test-data";
import { expect } from "@playwright/test";

export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.passwordInput = page?.locator('input#password');
        this.createAcctBtn = page?.locator('button[data-qa="create-account"]');
        this.continueBtn = page?.locator('a[data-qa="continue-button"]');
        this.userNameInput = page?.locator('#name');
        this.emailInput = page?.locator('#email');
        this.daySelect = page?.locator('select#days');
        this.monthSelect = page?.locator('select#months');
        this.yearSelect = page?.locator('select#years');
        this.signUpCheckbox = page?.locator('#newsletter');
        this.optInCheckbox = page?.locator('#optin');
        this.fNameInput = page?.locator('input#first_name');
        this.lNameInput = page?.locator('input#last_name');
        this.companyInput = page?.locator('input#company');
        this.address1Input = page?.locator('input#address1');
        this.address2Input = page?.locator('input#address2');
        this.countrySelect = page?.locator('select#country');
        this.stateInput = page?.locator('input#state');
        this.cityInput = page?.locator('input#city');
        this.zipCodeInput = page?.locator('input#zipcode');
        this.phoneInput = page?.locator('input#mobile_number');

    }

    async fillInUserDetails() {
        console.log(`Checking randomUser obj: ${JSON.stringify(randomUser)}`);
        // fill in title
        const titleIds = ['id_gender1', 'id_gender2'];
        const randomNum = Math.floor(Math.random() * titleIds.length);
        await this.page?.locator(`input#${titleIds[randomNum]}`).check();

        // validate username and email fields are filled in
        await expect(this.userNameInput).toHaveValue(randomUser.userName);
        await expect(this.emailInput).toHaveValue(randomUser.email);

        // fill in the rest of fields
        await this.passwordInput.fill(randomUser.password);
        await this.daySelect.selectOption(randomUser.day);
        await expect(this.daySelect).toHaveValue(randomUser.day);
        await this.monthSelect.selectOption(randomUser.month);
        await expect(this.monthSelect).not.toHaveText('Month');
        await this.yearSelect.selectOption(randomUser.year);
        await expect(this.yearSelect).toHaveValue(randomUser.year);
        await this.signUpCheckbox.check();
        await this.optInCheckbox.check();
        await this.fNameInput.fill(randomUser.fName); 
        await this.lNameInput.fill(randomUser.lName); 
        await this.address1Input.fill(randomUser.address1);
        await this.countrySelect.selectOption(randomUser.country);
        await this.stateInput.fill(randomUser.state);   
        await this.cityInput.fill(randomUser.city);      
        await this.zipCodeInput.fill(randomUser.zipCode);      
        await this.phoneInput.fill(randomUser.phoneNum);
    }

    async createAccount() {
        await this.createAcctBtn.click();
        await expect(this.page).toHaveURL(/(account_created)/g); // validate account create success page
    }

    async continue() {
        await this.continueBtn.click();
    }
}