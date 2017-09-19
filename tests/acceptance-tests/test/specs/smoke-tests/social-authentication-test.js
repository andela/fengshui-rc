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

describe("facebook login", function () {
  it("should login user provided user has a valid facebook account", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    // default to process env if we've got that
    const facebookEmail = process.env.FACEBOOK_EMAIL;
    const facebookPassword = process.env.FACEBOOK_AUTH;

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.click("btn btn-primary btn-block provider-facebook");
    browser.setValue("#email-qJ9ibntYyG4wYvmzE", facebookEmail);
    browser.setValue("#password-qJ9ibntYyG4wYvmzE", facebookPassword);
    
    browser.click(eleMap.login_btn);
    browser.pause("5000");
    expect(browser.getText("#logged-in-display-name")).to.equal(adminUserName);
  });
});
