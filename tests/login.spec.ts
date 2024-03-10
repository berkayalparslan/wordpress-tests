// @ts-check
import {test, expect} from '@playwright/test';
import LoginPage from '../pages/login.page';

const userName: string = process.env.USER_NAME!;
const userPassword: string = process.env.USER_PASSWORD!;

test.describe('login page', () => {
    let loginPage: LoginPage;
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin`);
        loginPage = new LoginPage(page);

    });

    test('should redirect to wp-admin page when existing user credentials are entered', async({page}) => {
        const wpAdminContent = page.locator('div#wpcontent');
        const wpAdminMenu = page.locator('ul#adminmenu');

        await loginPage.loginUser(userName, userPassword);

        await expect(wpAdminContent).toBeVisible();
        await expect(wpAdminMenu).toBeVisible();
        await expect(page.getByText('Howdy, ')).toBeVisible();
    });

    test('should display error if wrong username and password are entered', async({page}) => {
        const loginError = page.locator('#login_error');
        const nonExistentUserName = 'test';
        const nonExistentUserPassword = 'test';

        await loginPage.loginUser(nonExistentUserName, nonExistentUserPassword);

        await expect(loginError).toContainText('  Error: The username test is not registered on this site. If you are unsure of your username, try your email address instead.');
    });
});