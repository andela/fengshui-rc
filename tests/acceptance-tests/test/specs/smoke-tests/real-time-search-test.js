"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;


beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Real time search test", function () {
  it("should work when a user types `product` in the search box", function () {
    const inputText = "product";
    browser.pause("5000");
    browser.click(".search");
    browser.pause(5000);
    browser.setValue("#search-input", inputText);
    browser.pause("5000");
    expect(browser.getText(".overlay-title")).to.equal("BASIC REACTION PRODUCT");
  });

  it("should work when a user types `basic` in the search box", function () {
    const inputText = "basic";
    browser.pause("5000");
    browser.click(".search");
    browser.pause(5000);
    browser.setValue("#search-input", inputText);
    browser.pause("5000");
    expect(browser.getText(".overlay-title")).to.equal("BASIC REACTION PRODUCT");
  });
});
