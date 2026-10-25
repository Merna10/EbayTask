import { Locator, Page, expect } from "@playwright/test";
import {step} from "../../utils/config/StepDecorator"

export class HomePage{

    private readonly page           :Page;

    constructor(page:Page){
        this.page                   =page;
    }

    @step("Open Home Page")
    async openHomePage(baseURL:string):Promise<void>{
        await this.page.goto(baseURL,{waitUntil:"domcontentloaded"});
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