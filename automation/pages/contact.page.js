import { expect } from "@playwright/test";
import { randomUser } from "../test-data";

export class ContactPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page?.locator('input[data-qa="name"]');
        this.emailInput = page?.locator('input[data-qa="email"]');
        this.subjectInput = page?.locator('input[data-qa="subject"]');
        this.messageInput = page?.locator('textarea[data-qa="message"]');
        this.submitBtn = page?.locator('input[data-qa="submit-button"]');
    }

    async navigateToContactPage() {
        await this.contactFmLink.click();
    }

    async fillInContactForm() {
        await this.nameInput.fill(randomUser.userName);
        await this.emailInput.fill(randomUser.email);
        await this.subjectInput.fill('TestTest');
        await this.messageInput.fill('TestTestTestTestTestTestTestTestTest');
        await this.submitBtn.click();
    }
}