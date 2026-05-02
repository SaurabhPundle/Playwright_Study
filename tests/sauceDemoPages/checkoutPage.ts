import {Page , test} from '@playwright/test';
import { basePage } from './basePage';

export class checkOutPage extends basePage{
    constructor (page:Page){
            super(page);
    }
    private itemName = ".inventory_item_name";

    async getProductNameInCart() : Promise<string> {
    return (await this.page.locator(this.itemName).textContent()).trim() || '';
    }
}