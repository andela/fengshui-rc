"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Real time search", function () {
  it("should work when a user types `b` in the search box", function () {
    const inputText = "b";
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", inputText);
    browser.waitForExist(".search-tag", "2000");
    expect(browser.getText(".search-tag")).to.contain("example-product");
    expect(browser.getText("#product-title")).to.contain("BASIC REACTION PRODUCT");
  });

  it("should work when a user types `aer` in the search box", function () {
    const inputText = "aer";
    browser.waitForExist(".search", "5000");
    browser.click(".search");
    browser.waitForExist("#search-input", "5000");
    browser.setValue("#search-input", inputText);
    browser.waitForExist("#search-input", "5000");
    browser.waitForExist("#product-title", "5000");
    expect(browser.getText("#product-title")).to.contain("AEROPLANE");
  });
});
