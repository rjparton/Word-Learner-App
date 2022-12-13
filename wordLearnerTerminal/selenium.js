// const { Builder } = require("selenium-webdriver");
import { Builder } from "selenium-webdriver";
// const ie = require('selenium-webdriver/ie');
import ie from 'selenium-webdriver/ie.js';

let options = new ie.Options();
let driver = await new Builder()
  .forBrowser('internetExplorer')
  .setIeOptions(options)
  .build();

await driver.quit();

