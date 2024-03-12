// @ts-check
import { test as setup, expect} from '@playwright/test';
import LoginPage from '../../pages/login.page';

const authFile = 'playwright/.auth/user.json';
const userName: string = process.env.USER_NAME!;
const userPassword: string = process.env.USER_PASSWORD!;

setup('authenticate', async({page}) => {
    let loginPage = new LoginPage(page);
    await page.goto(`/wp-admin/index.php`);
    await loginPage.loginUser(userName, userPassword);
    await page.waitForURL('/wp-admin/index.php');
    await page.context().storageState({ path: authFile });
})