// @ts-check
import {test, expect} from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('add post page', () => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/post-new.php`);
    })

    test('should allow adding a new post', async({page}) => {
        await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add title').fill('new post title');
        await page.frameLocator('iframe[name="editor-canvas"]')
        .locator('div.wp-block-post-content p').first().pressSequentially('this is a new post');
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
        await page.getByLabel('Dismiss this notice').getByRole('link', { name: 'View Post' }).click();

        await page.getByRole('heading', { name: 'new post title' }).isVisible();
        await page.getByText('this is a new post').isVisible();
        await page.getByRole('link', { name: 'Uncategorized' }).isVisible();
        await page.getByRole('link', { name: 'Mar 11,' }).isVisible();
    });
})