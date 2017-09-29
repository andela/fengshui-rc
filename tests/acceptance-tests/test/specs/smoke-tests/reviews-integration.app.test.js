"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("review test", function () {
  it("verifies a review is made succesfully", () => {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));


    const email = "test@test.com";
    const password = "tester";

    browser.waitForExist(eleMap.login_dropdown_btn, "5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(eleIds.login_email_fld_id, "5000");
    browser.setValue(getId.retId(eleIds.login_email_fld_id), email);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), password);
    browser.click(eleMap.login_btn);
    browser.waitForExist(eleMap.product_click, "5000");

    browser.waitForExist.click(eleMap.product_click, "5000");
    browser.waitForExist("a.product-grid-item-images", "5000");
    browser.click("a.product-grid-item-images");
    browser.scroll(-100, 1000);
    browser.waitForExist(eleMap.star_click, "1000");
    browser.click(eleMap.star_click);
    browser.setValue("#comment", "This is a review");
    browser.click(eleMap.send_review);

    expect(browser.getAttribute("div", "fb-integration")).to.exist;
  });
});
