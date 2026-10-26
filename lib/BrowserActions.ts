import { FrameLocator, Locator, Page,expect } from '@playwright/test';
import { step } from '../utils/config/StepDecorator';

export class BrowserActions {
  protected readonly page             :Page;

  constructor(page: Page) {
    this.page                         = page;
  }

  @step("Navigate to {0}")
  async navigate(url: string) {
    this.page.goto(url,{ waitUntil: 'domcontentloaded' });
  }
  
}