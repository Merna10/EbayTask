import { expect, Locator,Page } from "@playwright/test";
import { step } from "../../utils/config/StepDecorator";

export class SearchResults{
    private readonly page                   :Page;
    private readonly searchItemHeading      :Locator;
    private readonly resultItems            :Locator;
    private readonly transmissionFilter     :Locator;
    private readonly appliedFilterPills     :Locator;

    constructor(page:Page){
        this.page                           = page;
        this.searchItemHeading              = page.getByRole('heading', { name: /results? for/i }); 
        this.transmissionFilter             = page.getByRole('group', { name: 'aspect-Transmission' });
        this.resultItems                    = page.locator('ul.srp-results > li.s-card');
        this.appliedFilterPills             = page.getByRole('link', { name: 'Remove filter' });
;
    }

    @step("Validate results was returned for the search term ")
    async validateResults(item:string):Promise<void>{
        await expect(this.searchItemHeading).toBeVisible();
        await expect(this.resultItems.first()).toBeVisible();
        const itemTitle = ((await this.searchItemHeading.textContent()) ?? '').toLowerCase();
        expect(itemTitle).toContain(item.toLowerCase());
    }

    @step("Get Result Count of {0}")
    async getResultCount(searchItem: string):Promise<number>{  
        const text = await this.searchItemHeading.innerText();
        return parseInt(text.replace(/,/g, ''), 10);
    }

    
    @step("Validate first card matches the search term ")
    async validateFirstTitle(item: string): Promise<void>{
        const title = this.resultItems.first().getByRole('heading', { level: 3 }) .getByText(item);
        const heading = ((await title.textContent()) ?? '').toLowerCase();
        expect(heading).toContain(item);
    }

    @step("Validate Transmission is visibile")
    async validateTransmissionFilterVisible():Promise<void>{
        await expect(this.transmissionFilter).toBeVisible();
    }

    @step("Select {0} filter")
    async selectTransmissionFilter(filter:string):Promise<void>{
        if(filter=="Automatic"){
            await this.transmissionFilter.getByRole("link",{name:/^Automatic/}).click();
        }else if(filter=="Manual"){
            await this.transmissionFilter.getByRole("link",{name:/^Manual/}).click();
        }else if(filter=="Not Specified"){
            await this.transmissionFilter.getByRole("link",{name:/^Not Specified/}).click();
        }
    }

    @step("validate Filter is applied")
    async validateFilterApplied( option: string): Promise<void> {
        await expect(this.appliedFilterPills.filter({ hasText: new RegExp(option, 'i') }).first()).toBeVisible();
        await expect.soft(this.resultItems.first()).toBeVisible();
    }
}
