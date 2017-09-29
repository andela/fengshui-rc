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
});

describe("Ordering product test", function () {
  it("should display success message to the user after successful order", function () {
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
        browser.click("//div[text()='Basic Reaction Product']");
        browser.waitForExist("//span[text()='Red']");
        browser.click("//span[text()='Red']");
        browser.waitForExist(".js-add-to-cart");
        browser.click(".js-add-to-cart");
        browser.waitForExist("#btn-checkout");
        browser.click("#btn-checkout");
        browser.waitForExist("//span[text()='Free Shipping']");
        browser.click("//span[text()='Free Shipping']");
        browser.waitForExist("#payment-methods-accordian");
        browser.click("#payment-methods-accordian");
        browser.setValue("input[name='cardNumber']", process.env.VISA);
        browser.waitForExist("select[name='expireMonth']");
        browser.click("select[name='expireMonth']");
        browser.click("option[value='2']");
        browser.click("select[name='expireYear']");
        browser.click("option[value='2019']");
        browser.setValue("input[name='cvv']", "123");
        browser.click("//span[text()='Complete your order']");
        browser.waitForExist(".order-detail-title");
        expect(browser.getAttribute("div", "order-item")).to.exist;
        expect(browser.getText(".order-detail-title")).to.equal("Basic Reaction Product Option 1 - Red Dwarf");
        expect(browser.getText("#customers-email")).to.equal(process.env.GUEST_EMAIL);
        expect(browser.getAttribute("div", "order-item")).to.exist;
      });
    });  