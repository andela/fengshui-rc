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

describe("Manage static pages", function () {
  it("verify admin can create static pages", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    const adminEmail = "9mjirq2d@localhost";
    const adminPassword = "xCkfST5p";
    browser.waitForExist(eleMap.login_dropdown_btn, "5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.waitForExist(eleMap.account_dropdown, "5000");

    browser.click(eleMap.account_dropdown);
    browser.waitForExist(eleMap.dashboard_dropdown, "6000");
    browser.click(eleMap.dashboard_dropdown);
    browser.waitForExist(eleMap.manage_static_page, "5000");
    browser.click(eleMap.manage_static_page);
    browser.waitForExist("#static-page-title", "5000");
    browser.setValue("#static-page-title", "About-Page");
    browser.setValue("#static-page-slug", "About-Page");
    browser.click(".fa-header");
    browser.click("#static-pages-submit");
    browser.waitForExist("#looged-in-display-name", "5000");
    browser.click("#looged-in-display-name");
    browser.pause(2000);
    browser.click(eleMap.created_page);
    browser.pause(2000);
    expect(browser.getText(".page-title")).to.equal("About-Page");
  });
});

