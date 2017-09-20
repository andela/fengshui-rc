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
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    const adminEmail = process.env.REACTION_EMAIL || usrData.admin_email;
    const adminPassword = process.env.REACTION_AUTH || usrData.admin_pw;

    browser.waitForExist(eleMap.login_dropdown_btn, "5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(eleIds.login_email_fld_id, 3000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.waitForExist(eleMap.account_dropdown, "5000");

    browser.click(eleMap.account_dropdown);
    browser.waitForExist(eleMap.dashboard_dropdown, 3000);
    browser.click(eleMap.dashboard_dropdown);
    browser.waitForExist(eleMap.manage_static_page, 2000);
    browser.click(eleMap.manage_static_page);
    browser.setValue("#static_page_title", "About-Page");
    browser.setValue("#static-page-slug", "About-Page");
    browser.click("#static-pages-submit");
    browser.click("#logged-in-display-name");
    browser.waitForExist(eleMap.created_page, 2000);
    browser.click(eleMap.created_page);
    browser.waitForExist(eleMap.account_dropdown, 5000);

    browser.click(eleMap.account_dropdown);
    browser.waitForExist(eleMap.dashboard_dropdown, 1000);
    browser.click(eleMap.dashboard_dropdown);
    browser.waitForExist(eleMap.manage_static_page, 2000);
    browser.click(eleMap.manage_static_page);
    browser.waitForExist(eleMap.delete_page, 2000);
    browser.click(eleMap.delete_page);
    browser.waitForExist(eleMap.confirm_delete, 2000);
    browser.click(eleMap.confirm_delete);
    browser.waitForExist(eleMap.home_page, 5000);
    browser.click(eleMap.home_page);
    expect(browser.getAttribute("a", "About-Page")).to.exist;
  });
});

