import {
  BatchInfo,
  BrowserType,
  Configuration,
  DeviceName,
  Eyes,
  EyesRunner,
  Target,
  VisualGridRunner,
  ScreenOrientation,
} from "@applitools/eyes-playwright";
import { test, expect } from "@playwright/test";

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.beforeAll(async () => {
  // Configure Applitools SDK to run on the Ultrafast Grid
  Runner = new VisualGridRunner({ testConcurrency: 5 });
  Batch = new BatchInfo({ name: `Playwright Typescript Quickstart` });

  Config = new Configuration();
  Config.setBatch(Batch);
  Config.addBrowsers(
    { name: BrowserType.CHROME, width: 800, height: 600 },
    { name: BrowserType.FIREFOX, width: 1600, height: 1200 },
    { name: BrowserType.SAFARI, width: 1024, height: 768 },
    {
      chromeEmulationInfo: {
        deviceName: DeviceName.iPhone_11,
        screenOrientation: ScreenOrientation.PORTRAIT,
      },
    },
    {
      chromeEmulationInfo: {
        deviceName: DeviceName.Nexus_10,
        screenOrientation: ScreenOrientation.LANDSCAPE,
      },
    }
  );
});

test.describe("Todos", () => {
  let eyes: Eyes;

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);

    // Start Applitools Visual AI Test
    // Args: Playwright Page, App Name, Test Name, Viewport Size for local driver
    await eyes.open(
      page,
      "Next.js Todo App",
      `Playwright Typescript: Quickstart`,
      {
        width: 1200,
        height: 600,
      }
    );
  });

  test.afterEach(async () => {
    // End Applitools Visual AI Test
    await eyes.close();
  });

  test("has title", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Capture the full web page
    await eyes.check("Main page", Target.window().fully());

    await expect(page.getByRole("heading")).toHaveText(/todos/i);
  });
});
