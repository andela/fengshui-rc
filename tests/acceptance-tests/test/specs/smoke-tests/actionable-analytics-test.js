"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");
const dotenv = require("dotenv");

dotenv.config();
beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("simple login test", function () {
  it("verify that actionable analytics are generated", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = process.env.REACTION_EMAIL;
    const adminPassword = process.env.REACTION_AUTH;

    browser.waitForExist(eleMap.login_dropdown_btn);
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(".form-control");
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.waitForExist(eleMap.dashboard);
    browser.click(eleMap.dashboard);
    browser.waitForExist(eleMap.analytics);
    browser.click(eleMap.analytics);
    browser.waitForExist(".ordersPlaced", "5000");
    browser.waitForExist(".itemsSold", "5000");
    expect(browser.getText(".ordersPlaced")).to.contain("1");
    expect(browser.getText(".itemsSold")).to.contain("8");
  });
});
