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
});

describe("Payment by Paystack", function () {
  xit("should be available when a user decides to buy a product", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    const guestEmail = process.env.GUEST_EMAIL;
    const guestPw = process.env.GUEST_PASSWORD;

    browser.waitForExist(".product-grid");
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(eleMap.login_btn);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), guestEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), guestPw);
    browser.click(eleMap.login_btn);
    browser.waitForExist("#logged-in-display-name");
    browser.click("//div[text()='Apple Watch']");
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
    browser.pause(2000);
    browser.click("#completeOrder");
    const frameCount = browser.selectorExecuteAsync("//iframe", function (frames, message, callback) {
      const paystackIframe = document.getElementsByTagName("iframe");
      const IframeName = paystackIframe[0].name;
      callback(IframeName);
    }, " iframe on the page");
    browser.frame(frameCount);
    browser.pause(5000);
    browser.setValue(getId.customRetId(eleIds.cardnumber_id), process.env.cardNumber);
    browser.setValue(getId.customRetId(eleIds.expiry_id), process.env.expiryDate);
    browser.setValue(getId.customRetId(eleIds.cvv_id), process.env.cv);
    browser.click("#pay-btn");
    browser.pause(2000);
    browser.switchTab();
    expect(browser.getAttribute("div", "order-item")).to.exist;
    expect(browser.getText("#orderTitle")).to.equal("Apple Watch watch");
  });
});
