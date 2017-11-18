/* global document */

"use strict";

const puppeteer = require("puppeteer"),

    config = require("../config");

let page, browser;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page    = await browser.newPage();
});

afterAll(() => {
    browser.close();
});

describe("GW2", async () => {
    test("can load the homepage", async () => {
        await page.goto(`${config.urlBase}/`);
    });

    test("can load a blog post", async () => {
        const firstPost = "#blog li:first-child a",
            postHeader  = "h2.blog-title";

        let title;

        await page.goto(`${config.urlBase}/`);

        title = await page.evaluate((sel) => document.querySelector(sel).innerText, firstPost);

        page.click(firstPost);
        await page.waitForNavigation();

        expect(await page.evaluate((sel) => document.querySelector(sel).innerText, postHeader)).toBe(title);
    });
});
