import {Page, Locator} from '@playwright/test';

export default class LoginPage{
    readonly page:Page;
    readonly userNameOrEmailInput: Locator;
    readonly passwordInput: Locator
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator;
    readonly lostYourPasswordLink: Locator;
    readonly goToTestBlogButton: Locator

    constructor(page:Page){
        this.page = page;
        this.userNameOrEmailInput = page.getByLabel('Username or Email Address');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.rememberMeCheckbox = page.getByLabel('Remember Me');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.lostYourPasswordLink = page.getByRole('link', { name: 'Lost your password?' });
        this.goToTestBlogButton = page.getByRole('link', { name: '← Go to test blog' });
    }

    async loginUser(userNameOrEmail: string, password: string){
        await this.userNameOrEmailInput.fill(userNameOrEmail);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}