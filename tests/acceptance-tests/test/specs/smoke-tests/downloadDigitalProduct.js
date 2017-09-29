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
  it("should be downloaded once an authorized buyer click on 'Download Product'", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    // default to process env if we've got that
    const guestEmail = process.env.guest_email;
    const guestPw = process.env.guest_pw;

    browser.pause(5000);
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), guestEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), guestPw);
    browser.click(eleMap.login_btn);
    browser.pause(3000);
    browser.click("//div[text()='Apple Watch']");
    browser.pause(2000);
    browser.click(eleMap.add_to_cartt);
    browser.pause(3000);
    browser.click("#btn-checkout");
    browser.pause(3000);
    browser.click("//span[text()='Free Shipping']");
    browser.pause(2000);
    browser.click("//span[text()='Example Payment']");
    browser.pause(2000);
    browser.setValue("input[name='cardNumber']", process.env.visa);
    browser.click("select[name='expireMonth']");
    browser.pause(2000);
    browser.click("option[value='1']");
    browser.pause(2000);
    browser.click("select[name='expireYear']");
    browser.pause(2000);
    browser.click("option[value='2020']");
    browser.setValue("input[name='cvv']", process.env.cvv);
    browser.pause(2000);
    browser.click("#btn-complete-order");
    browser.pause(5000);
    browser.click("//a[text()='Download Product']");
    browser.pause(3000);
    expect(browser.getAttribute("a", "btn btn-success download-btn")).to.exist;
  });
});
