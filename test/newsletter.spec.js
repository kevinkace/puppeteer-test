"use strict";

const puppeteer = require("puppeteer");
const moment    = require("moment");

const config  = require("../config");
const date    = new Date();
const user    = {
    email : config.emailBase.replace("{}", moment().format("MMDDYYYYhhmm")),
    month : `${date.getMonth() + 1}`,
    day   : `${date.getDate()}`,
    year  : `${date.getFullYear() - 20}`
};

let page, browser;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page    = await browser.newPage();
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

        await page.click(`form [name="email"]`);
        await page.keyboard.type(user.email);

        await page.click(`form [name="month"]`);
        await page.keyboard.type(user.month);

        await page.click(`form [name="day"]`);
        await page.keyboard.type(user.day);

        await page.click(`form [name="year"]`);
        await page.keyboard.type(user.year);

        await page.click(`form [type="submit"]`);

        await page.waitForSelector("#nls-step-added", { visible : true });
    });
});
