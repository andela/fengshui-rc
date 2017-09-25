"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("User", function () {
  xit("should be able to click on the faqs button see the faqs page", function () {
    browser.waitForExist(".faqs-button", "5000");
    browser.waitForExist("#faqs", "5000");
    browser.click("#faqs");
    browser.pause("10000");
    browser.waitForExist(".faqs-header", "5000");
    browser.waitForExist(".faqs-question", "5000");
    browser.waitForExist(".faqs-answer", "2000");
    browser.waitForVisible(".faqs-header", 5000);
    expect(browser.getText(".faqs-header")).to.equal("Frequently Asked Questions (FAQs)");
  });
});
