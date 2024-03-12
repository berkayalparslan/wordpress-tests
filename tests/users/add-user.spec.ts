// @ts-check
import {test, expect} from '@playwright/test';

function generateNewUser(userRole: string){
    const randomNr = ((Math.random() * 100) % 10).toString();
    let userName, email, firstName, lastName, website, password;
    firstName = `new${randomNr}`;
    lastName = `user${randomNr}`
    userName = `${firstName}${lastName}`;
    email = `${userName}@${randomNr}.com`;
    website = `${userName}.com`
    password = `WeakPassword123AndSomeRandomCharacters456${randomNr}`;
    return {
      userName: userName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      website: website,
      password: password,
      role: userRole
    }
  }


test.describe('add user page', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/user-new.php`);
    });

    test('should add a new user when all required fields are filled', async({page}) => {
        const newUser = generateNewUser('Subscriber');
        let userId = "";

        await page.getByLabel('Username (required)').fill(newUser.userName);
        await page.getByLabel('Email (required)').fill(newUser.email);
        await page.getByLabel('Password (required)', { exact: true }).fill(newUser.password);
        await page.getByLabel('Role').selectOption('subscriber');
        await page.getByRole('button', { name: 'Add New User' }).click();

        // await page.waitForURL("**/users.php?id=*").then(() => {
        //     userId = page.url().split('id=')[1];
        //   })

        await page.getByLabel('Search Users:').fill(newUser.userName);
        await page.getByRole('button', { name: 'Search Users' }).click();

    //     await expect(page.locator(`#user-${userId}`).getByRole('link', {name: newUser.userName, exact: true})).toBeVisible();
    //   await expect(page.locator(`#user-${userId}`).getByText(`${newUser.firstName} ${newUser.lastName}`)).toBeVisible();
      await expect(page.getByText(newUser.email)).toBeVisible();
      await expect(page.getByRole('cell',{name: newUser.role})).toBeVisible();
      await expect(page.locator('tbody#the-list tr td.column-posts')).toContainText('0');
    })
})