
import { test as base } from "@playwright/test";
import { HomePage } from "../logic/pages/Home.page";
import { SearchResults } from "../logic/pages/SearchResults.page";
import { SearchBoxComponent } from "../logic/components/SearchBox.Component";
import { DeliveryComponents as DeliveryComponent } from "../logic/components/Delivery.Component";

type pages = {
  homePage                :HomePage;
  searchResultsPage       :SearchResults;
  searchBoxComponent      :SearchBoxComponent;
  deliveryComponent       :DeliveryComponent;
};

export const test = base.extend<pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResults(page));
  },
  searchBoxComponent: async ({ page }, use) => {
    await use(new SearchBoxComponent(page));
  },
  deliveryComponent: async ({ page }, use) => {
    await use(new DeliveryComponent(page));
  },
});

