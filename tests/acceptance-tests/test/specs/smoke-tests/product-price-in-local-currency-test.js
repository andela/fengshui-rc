"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Product price display", function () {
  it("should display product in users local currency", function () {
    browser.waitForExist(".rui", "5000");
    browser.waitForExist("#product-title", "5000");
    browser.waitForExist(".currency-symbol", "10000");
    browser.pause("7000");
    expect(browser.getText(".currency-symbol")).to.contain("₦");
  });
});
