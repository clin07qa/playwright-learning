import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItemContainer = page?.locator('#cart_info_table');
    }

    async validateCartItemQty() {
        const itemRows = this.cartItemContainer?.locator('tbody > tr');
        await expect(itemRows).toHaveCount(1);
    }
}