import { expect } from "@playwright/test";

export class ProductLandingPage {
    constructor(page) {
        this.page = page;
        this.allProductsContainer = page?.locator('div[class="features_items"]');
    }

    async navigateToPDP() {
        const numProductCards = await this.allProductsContainer.locator('.product-image-wrapper').count();
        const randomProductIndex = Math.floor(Math.random() * numProductCards);
        const randomProductCard = await this.allProductsContainer.locator('.product-image-wrapper').nth(randomProductIndex);
        await expect(randomProductCard.locator('li > a')).toBeVisible();
        await randomProductCard.locator('li > a').click();
        await expect(this.page).toHaveURL(/(product_details)/g);
    }
}