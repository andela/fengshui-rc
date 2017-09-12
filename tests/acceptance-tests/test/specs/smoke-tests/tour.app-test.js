"use strict";
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
  // browser.getSession().then(function (sessionid) {
  //   browser.sessionID = sessionid.id_;
  // });
});

describe("Tour", function () {
  it("should take a user through the app when the tour button is clicked", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    browser.pause(2000);
    browser.click(eleMap.take_tour);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_next);
    browser.pause(2000);
    browser.click(eleMap.take_tour_done);
    expect(browser.getAttribute("a", "introjs-button introjs-skipbutton introjs-donebutton")).to.exist;
  });
});
