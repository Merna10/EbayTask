import { test } from '../fixtures/BasePage';
import * as homePageData from "../data/homePage.data.json"

test.describe('eBay home page', () => {
  test.beforeEach(async ({ homePage}) => {
    await homePage.openHomePage(homePageData.HomePageURL);
  });

  test('Validate landing on the main page', async ({ homePage, searchBoxComponent }) => {
    await homePage.verifyPageURL(homePageData.HomePageURL);
    await homePage.verifyPageTitle(homePageData.HomePageTitle);
    await searchBoxComponent.verifySearchBoxVisibility();
  });

  test('Search for item, log result count and apply Transmission filter', async ({homePage,searchBoxComponent,searchResultsPage,}) => {
    await homePage.verifyPageURL(homePageData.HomePageURL);
    await homePage.verifyPageTitle(homePageData.HomePageTitle);

    await searchBoxComponent.searchForItem(homePageData.Item);
    await searchResultsPage.validateResults(homePageData.Item);
    await searchResultsPage.validateFirstTitle(homePageData.Item);

    const totalCount = await searchResultsPage.getResultCount(homePageData.Item);
    
    console.log("Items for the search result = ",totalCount);
    await searchResultsPage.validateTransmissionFilterVisible();
    await searchResultsPage.selectTransmissionFilter(homePageData.transmissionFilter);
    await searchResultsPage.validateFilterApplied(homePageData.transmissionFilter);

    const filteredCount = await searchResultsPage.getResultCount(homePageData.Item);
    console.log("Items after filter = ",filteredCount);
  });
});
