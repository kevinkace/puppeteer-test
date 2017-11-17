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
    browser = await puppeteer.launch();
    page    = await browser.newPage();
});

afterAll(() => {
    browser.close();
});

describe("Path of Fire", async () => {
    test("can load microsite", async () => {
        await page.goto(`${config.urlBase}/path-of-fire/`);
    });

    test("can signup to newsletters successfully", async () => {
        await page.goto(`${config.urlBase}/path-of-fire/`);

        await page.click(`form [name="email"]`);
        await page.keyboard.type(user.email);

        await page.click(`form [name="month"]`);
        await page.keyboard.type(user.month);

        await page.click(`form [name="day"]`);
        await page.keyboard.type(user.day);

        await page.click(`form [name="year"]`);
        await page.keyboard.type(user.year);

        await page.click(`form [type="submit"]`);

        await page.waitForSelector("#newsletter .mc869e1a60_h");
    });
});
