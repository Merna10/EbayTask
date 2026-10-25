import { FrameLocator, Locator, Page,expect } from '@playwright/test';
import { step } from '../../utils/config/StepDecorator';

export class DeliveryComponents {
  private readonly page             :Page;
  private readonly addressBtn       :Locator;
  private readonly shippingFrame    :FrameLocator;
  private readonly countrySelect    :Locator;
  private readonly confirmBtn       :Locator;

  constructor(page: Page) {
    this.page                       = page;
    this.addressBtn                 = page.locator('.gh-ship-to__menu');
    this.shippingFrame              = page.frameLocator('iframe[title="Shipping Address"]');
    this.countrySelect              = this.shippingFrame.getByLabel('Country or Region');
    this.confirmBtn                 = this.shippingFrame.getByRole('button', { name: 'Confirm' });
  }

  @step("Set the delivery location to {0}")
  async setLocation(countryCode: string) {
    await this.countrySelect.waitFor({ state: 'visible', timeout: 3000 }).catch(() => this.addressBtn.click());
    await expect(this.countrySelect).toBeVisible();
    await this.countrySelect.selectOption(countryCode);
    await this.confirmBtn.click();
    await expect(this.countrySelect).toBeHidden();
  }
}