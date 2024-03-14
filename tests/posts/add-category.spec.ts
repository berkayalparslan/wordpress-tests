// @ts-check
import { test, expect } from "@playwright/test";
import { generateRandomString } from "../../utils/utils";

test.use({ storageState: "playwright/.auth/user.json" });

test.describe('add category page', () => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/edit-tags.php?taxonomy=category`);
    })

    test('allows adding a new category', async({page}) => {
        const randomNumber = generateRandomString();
        console.log('generated number', randomNumber);
        const categoryName = `New Category ${randomNumber}`;
        const categorySlug = `new-category-${randomNumber}`;
        const categoryDescription = `this is a new category with random number: ${randomNumber}`
        await page.getByRole('textbox', { name: 'Name' }).fill(categoryName);
        await page.getByRole('textbox', { name: 'Slug' }).fill(categorySlug);
        await page.getByRole('textbox', { name: 'Description' }).fill(categoryDescription);
        await page.getByRole('button', { name: 'Add New Category' }).click();

        await expect(page.getByRole('cell', { name: `“${categoryName}” (Edit) Edit “${categoryName}` })).toBeVisible();
        await expect(page.getByRole('cell', { name: categoryName })).toBeVisible();
        await expect(page.getByRole('cell', { name: categorySlug })).toBeVisible();
        await expect(page.getByRole('cell', { name: `“${categoryName}” (Edit) Edit “${categoryName}` })).toContainText('Edit | Quick Edit | Delete |');

    })
});