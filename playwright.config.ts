import { defineConfig, devices } from '@playwright/test';

const STORAGE_STATE = '.auth/ebay.json';


export default defineConfig({
  testDir: './tests',
  
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,

  expect: { 
    timeout: 15_000 
  },

  reporter: [['list'], ['html', { open: 'never' }]],


  use: {
    headless: true,
    locale: 'en-US',
    launchOptions: {
      slowMo: Number(process.env.SLOWMO ?? 0),
      args: ['--disable-blink-features=AutomationControlled'],
    },
    video: 'on',
    screenshot: 'on',
    trace: 'on',
  },

  projects: [
    { 
      name: 'setup', 
      testMatch: "ebay.setup.ts"
    },

    {
      name: 'Edge',
      dependencies: ['setup'],
      use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: STORAGE_STATE },
    },
    // {
    //   name: 'chromium',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
    // },
  ],
});
