import { Locator, Page, expect } from "@playwright/test";
import {step} from "../../utils/config/StepDecorator"

export class SearchBoxComponent{

    private readonly page           :Page;
    private readonly searchBox      :Locator;
    private readonly searchBtn      :Locator;

    constructor(page:Page){
        this.page                   =page;
        this.searchBox              =page.getByRole("combobox",{name :"Search for anything"});
        this.searchBtn              =page.getByRole("button",{name:"Search", exact: true });
    }
    @step("Verify search box is visible")
    async verifySearchBoxVisibility():Promise<void>{
        await expect(this.searchBox).toBeVisible();
    }

    @step("Search for {0}")
    async searchForItem(item:string):Promise<void>{
        await this.searchBox.fill(item);
        await this.searchBtn.click();
    }
    
}