import { Locator, Page, expect } from "@playwright/test";
import {step} from "../../utils/config/StepDecorator"
import { BrowserActions } from "../../lib/BrowserActions";

export class HomePage extends BrowserActions{
    
    constructor(page:Page){
        super(page);
    }

    @step("Open Home Page")
    async openHomePage(baseURL:string):Promise<void>{
        await this.navigate(baseURL);
    }


    @step("Verify Page URL")
    async verifyPageURL(expectedURL:string):Promise<void>{
        await expect(this.page).toHaveURL(expectedURL);
    }

    @step("Verify Page title is {0}")
    async verifyPageTitle(expectedTitle:string):Promise<void>{
        await expect(this.page).toHaveTitle(expectedTitle);
    }
    
}