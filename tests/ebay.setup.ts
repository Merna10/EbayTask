import { test as setup } from '../fixtures/BasePage';
import * as homePageData from '../data/homePage.data.json';


setup('Select the location', async ({ homePage, deliveryComponent, context,page }) => {
  await homePage.openHomePage(homePageData.HomePageURL);
  await deliveryComponent.setLocation(homePageData.location.countryCode);
  await page.waitForLoadState();
  await context.storageState({ path: '.auth/ebay.json' });
});
