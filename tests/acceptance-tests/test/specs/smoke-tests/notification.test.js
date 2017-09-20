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

    // default to process env if we've got that
    const adminEmail = "emmanuel.alabi@andela.com";
    const adminPassword = "qwerty123@";
    const adminUserName = process.env.REACTION_USER;

    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
    browser.click(eleMap.login_btn);
    browser.waitForExist(".product-grid-item-images", "5000");
    browser.click(".product-grid-item-images");
    browser.waitForExist(".title", "5000");
    browser.click(".title");
    browser.click(".js-add-to-cart");
    browser.waitForExist(".cart-icon", "5000");
    browser.click(".cart-icon");
    browser.waitForExist("#btn-checkout", "5000");
    browser.click("#btn-checkout");
    browser.waitForExist(".product-grid-item-images", "5000");
    browser.click("select[name='country']");
    browser.click("option[value='NG']");
    browser.setValue("input[name='fullName']", "Example");
    browser.setValue("input[name='address1']", "Example");
    browser.setValue("input[name='postal']", "121211");
    browser.setValue("input[name='city']", "example");
    browser.setValue("input[name='region']", "example");
    browser.setValue("input[name='phone']", "0000000000");
    browser.click("button");

    browser.waitForExist("#btn-checkout", "5000");
    browser.click("//span[text()='Free Shipping']");

    browser.waitForExist("//span[text()='Example Payment']", "5000");
    browser.click("//span[text()='Example Payment']");

    browser.waitForExist("input[name='cardNumber']", "5000");
    browser.setValue("input[name='cardNumber']", process.env.visa);

    browser.waitForExist("#select[name='expireMonth']", "5000");
    browser.click("select[name='expireMonth']");

    browser.waitForExist("option[value='1']", "5000");
    browser.click("option[value='1']");

    browser.waitForExist("select[name='expireYear']", "5000");
    browser.click("select[name='expireYear']");

    browser.waitForExist("option[value='2020']", "5000");
    browser.click("option[value='2020']");

    browser.waitForExist("input[name='cvv']", "5000");
    browser.setValue("input[name='cvv']", process.env.cvv);

    browser.waitForExist("#btn-complete-order", "5000");
    browser.click("#btn-complete-order");
    expect(span.getText()).toEqual("Thank you");
    expect(span.getText()).toEqual("Order updates will be sent to");
    expect(span.getText()).toEqual("emmanuel.alabi@andela.com");
    expect(span.getText()).toEqual("Your order is now");    
});
});