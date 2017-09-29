"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const expect = require("chai").expect;

beforeEach(() => {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("sorting", function () {
  it("searches for Item and sort by highest or lowest price and filter by vendor or price", () => {
    const searchQuery = "o";
    browser.waitForExist(".navbar-items");
    browser.waitForExist(".search");
    browser.click(".search");
    browser.waitForExist("#search-input");
    browser.setValue("#search-input", searchQuery);
    browser.scroll(0, 200);
    browser.click(".filter-search");

    browser.click("#brand-filter");
    browser.pause(2000);
    browser.click("//option[text()='Apple']");
    browser.waitForExist("#zu8fMi9jEhmWw2c7K");
    browser.click("#brand-filter");
    browser.waitForExist(".product-primary-images");
    browser.waitForExist("#product-title");

    expect(browser.getText("#product-title")).to.not.equal("GO-KART COSTUME");
    expect(browser.getText("#product-title")).to.contain("IPHONE X");
    expect(browser.getText("#product-title")).to.contain("IPHONE 8S");

    browser.click("//option[text()='All vendors']");
    browser.waitForExist("//option[text()='All vendors']");
    browser.click("//option[text()='Babatunde']");
    browser.waitForExist(".product-primary-images");
    browser.waitForExist("#product-title");

    expect(browser.getText("#product-title")).to.contain("GO-KART COSTUME");
    expect(browser.getText("#product-title")).to.not.equal("IPHONE X");
    expect(browser.getText("#product-title")).to.not.equal("IPHONE 8S");

    browser.click("//option[text()='All vendors']");
    browser.click("#price-filter");
    browser.waitForExist("#firstPrice");
    browser.click("#firstPrice");

    expect(browser.getText("#product-title")).to.contain("IPHONE X");
    expect(browser.getText("#product-title")).to.contain("IPHONE 8S");
    expect(browser.getText("#product-title")).to.not.equal("GO-KART COSTUME");
  });
});

