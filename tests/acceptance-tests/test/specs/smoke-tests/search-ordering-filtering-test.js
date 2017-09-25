"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("sorting", function () {
  it("searches for Item and sort by highest or lowest price and filter by vendor or price", () => {
    const searchQuery = "w";
    browser.waitForExist(".navbar-items", "5000");
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", searchQuery);
    browser.scroll(0, 200);
    browser.click(".filter-search");
    browser.waitForExist("#price-filter", "5000");
    browser.click("#price-filter");
    browser.waitForExist("#firstPrice", "5000");
    browser.click("#firstPrice");
    browser.waitForExist("#brand-filter", "5000");
    browser.click("#brand-filter");
    browser.waitForExist(".product-primary-images", "5000");
    browser.waitForExist("#product-title", "5000");
    expect(browser.getText("#product-title")).to.contain("BASIC REACTION PRODUCT");
  });
});

