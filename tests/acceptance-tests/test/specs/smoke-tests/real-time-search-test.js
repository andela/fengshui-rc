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
  it("should work when a user types `p` in the search box", function () {
    const inputText = "p";
    browser.pause("5000");
    browser.click(".search");
    browser.pause(5000);
    browser.setValue("#search-input", inputText);
    browser.pause("5000");
    expect(browser.getText(".overlay-title")).to.equal("BASIC REACTION PRODUCT");
  });

  it("should work when a user types `b` in the search box", function () {
    const inputText = "b";
    browser.pause("5000");
    browser.click(".search");
    browser.pause(5000);
    browser.setValue("#search-input", inputText);
    browser.pause("5000");
    expect(browser.getText(".overlay-title")).to.equal("BASIC REACTION PRODUCT");
  });
});
