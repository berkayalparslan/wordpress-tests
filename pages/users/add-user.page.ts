import { Page, Locator, Frame, FrameLocator } from "@playwright/test";
import { UserRoles } from "./user-roles";

export default class AddUserPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly websiteInput: Locator;
  readonly passwordInput: Locator;
  readonly generatePasswordButton: Locator;
  readonly sendUserNotificationCheckbox: Locator;
  readonly roleSelect: Locator;
  readonly addNewUserButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByLabel("Username (required)");
    this.emailInput = page.getByLabel("Email (required)");
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.websiteInput = page.getByLabel("Website");
    this.passwordInput = page.getByLabel("Password (required)", {
      exact: true,
    });
    this.generatePasswordButton = page.getByRole("button", {
      name: "Generate password",
    });
    this.sendUserNotificationCheckbox = page.getByLabel(
      "Send the new user an email"
    );
    this.roleSelect = page.getByLabel("Role");
    this.addNewUserButton = page.getByRole('button', { name: 'Add New User' })
  }

  async fillForm(
    userName: string,
    email: string,
    firstName?: string,
    lastName?: string,
    website?: string,
    password?: string
  ) {
    await this.userNameInput.fill(userName);
    await this.emailInput.fill(email);

    if(firstName){
        await this.firstNameInput.fill(firstName);
    }
    if(lastName){
        await this.lastNameInput.fill(lastName);
    }
    
    if(website){
        await this.websiteInput.fill(website);
    }
    
    if(password){
        await this.passwordInput.fill(password);
    }
    
  }

  async generatePassword(){
    await this.generatePasswordButton.click();
  }

  async setSendUserNotificationCheckbox(checked: Boolean) {
    if (checked) {
      await this.sendUserNotificationCheckbox.check();
    } else {
      await this.sendUserNotificationCheckbox.uncheck();
    }
  }

  async selectUserRole(userRole: UserRoles) {
    switch (userRole) {
      case UserRoles.Administrator:
        await this.roleSelect.selectOption("Administrator");
        break;
      case UserRoles.Author:
        await this.roleSelect.selectOption("Author");
        break;
      case UserRoles.Contributor:
        await this.roleSelect.selectOption("Contributor");
        break;
      case UserRoles.Editor:
        await this.roleSelect.selectOption("Editor");
        break;
      case UserRoles.Subscriber:
        await this.roleSelect.selectOption("Subscriber");
        break;
      default:
        throw new Error("Unknown user role");;
    }
  }

  async clickAddNewUserButton(){
    await this.addNewUserButton.click();
  }
}
