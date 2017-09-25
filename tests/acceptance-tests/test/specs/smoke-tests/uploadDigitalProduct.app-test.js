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

describe("Digital product", function () {
  xit("should be uploaded when admin decides to create a downloadable product", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    // default to process env if we've got that
    const adminEmail = process.env.REACTION_EMAIL;
    const adminPassword = process.env.REACTION_AUTH;

    browser.pause(5000);
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.pause(3000);
    browser.click(eleMap.open_create_product);
    browser.pause(2000);
    browser.click(eleMap.create_product);
    browser.pause(3000);
    browser.setValue("input[placeholder='Title']", "Digital Product");
    browser.setValue(eleMap.subtitle_input, "a digital product");
    browser.setValue(eleMap.vendor_input, "Nurudeen");
    browser.setValue(eleMap.description_input, "This is just for testing");
    browser.pause(2000);
    browser.click("select[name='category']");
    browser.pause(3000);
    browser.click("option[value='digital']");
    browser.pause(3000);
    browser.setValue("#uploadFile", require("path").resolve("selenium-server-standalone-3.4.0.jar"));
    browser.pause(3000);
    browser.click("#upload-btn");
    browser.pause(10000);
    expect(browser.getAttribute("button", "btn btn-success upload-progress")).to.exist;
  });
});
