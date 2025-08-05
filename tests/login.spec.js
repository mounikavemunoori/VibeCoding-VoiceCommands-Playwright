
import { test, expect } from '@playwright/test';

test.describe('QA test suite', ()=>{
    test("@Web Client App login", async({page})=>{
        const email = "anshika@gmail.com"
        const productName = 'zara coat 3';
        const password = "Iamking@000"
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email)
        await page.locator("#userPassword").fill(password)
        await page.locator("input[name='login']").click()
        await page.waitForLoadState("networkidle")
        await page.locator(".card-body b").first().waitFor()
        const titles = await page.locator(".card-body b").allTextContents()
        console.log("titles--->", titles)

    })
})