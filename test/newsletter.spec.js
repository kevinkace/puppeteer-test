"use strict";

const puppeteer = require("puppeteer"),
    moment      = require("moment"),

    config = require("../config"),

    date = new Date(),
    user = {
        email : config.emailBase.replace("{}", moment().format("MMDDYYYYhhmm")),
        month : `${date.getMonth() + 1}`,
        day   : `${date.getDate()}`,
        year  : `${date.getFullYear() - 20}`
    };

let page, browser;

beforeAll(async () => {
    browser = await puppeteer.launch(config.launchCfg);
    page    = await browser.newPage();
    await page.setViewport({ width : 1400, height : 1000 });
});

afterAll(() => {
    browser.close();
});

describe("Newsletter", async () => {
    test("can load newsletter signup form", async () => {
        await page.goto(`${config.urlBase}/newsletter-signup/`);
    });

    test("can signup successfully", async () => {
        await page.goto(`${config.urlBase}/newsletter-signup/`);

        await page.click(`form[action="/newsletter"] [name="email"]`);
        await page.keyboard.type(user.email);

        await page.click(`form[action="/newsletter"] [name="month"]`);
        await page.keyboard.type(user.month);

        await page.click(`form[action="/newsletter"] [name="day"]`);
        await page.keyboard.type(user.day);

        await page.click(`form[action="/newsletter"] [name="year"]`);
        await page.keyboard.type(user.year);

        await page.click('form[action="/newsletter"] [name="privacy"]')

        await page.click(`form[action="/newsletter"] [type="submit"]`);

        await page.waitForSelector("#nls-step-added", { visible : true });
    });
});
