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

describe("Payment by Paystack", function () {
  it("should be available when a user decides to buy a product", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    // default to process env if we've got that
    const guestEmail = process.env.guest_email;
    const guestPw = process.env.guest_pw;

    browser.waitForExist(".product-grid");
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(eleMap.login_btn);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), guestEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), guestPw);
    browser.click(eleMap.login_btn);
    browser.waitForExist("#logged-in-display-name");
    browser.click("//div[text()='Dig Prod']");
    browser.waitForExist(".add-to-cart-text");
    browser.click(eleMap.add_to_cartt);
    browser.waitForExist("#btn-checkout");
    browser.click("#btn-checkout");
    browser.waitForExist(".text-left");
    browser.click(".text-left");
    browser.waitForExist("//span[text()='Paystack Payment']");
    browser.click("//span[text()='Paystack Payment']");
    browser.waitForExist("input[name='payerEmail']");
    browser.setValue("input[name='payerEmail']", guestEmail);
    browser.setValue(".cc-number", process.env.cardNumber);
    browser.setValue("#expiry", process.env.expTime);
    browser.setValue("#cvv", process.env.cv);
    browser.click("#pay-btn");
    browser.waitForExist(".order-item");
    expect(browser.getAttribute("div", "order-item")).to.exist;
  });
});
