import { expect } from "@playwright/test";

export class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.pdpWrapper = page?.locator('div[class="product-information"]');
        this.randomQty = Math.floor(Math.random() * 10) + 2;
        this.qtyInput = page?.locator('#quantity');
        this.addToCartBtn = page?.locator('button[class="btn btn-default cart"]');
    }

    async addProductToCart() {
        await this.qtyInput.fill(this.randomQty.toString());
        await expect(this.qtyInput).toHaveValue(this.randomQty.toString());
        await expect(this.addToCartBtn).toBeVisible();
        await this.addToCartBtn.click();
    }
}