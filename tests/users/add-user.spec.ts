// @ts-check
import { test, expect } from "@playwright/test";
import AddUserPage from "../../pages/users/add-user.page";
import { UserRoles, getUserRoleName } from "../../pages/users/user-roles";
import { generateRandomString } from "../../utils/utils";

function generateNewUser(userRole: UserRoles) {
  const randomNr = generateRandomString();
  let userName, email, firstName, lastName, website, password;
  firstName = `new${randomNr}`;
  lastName = `user${randomNr}`;
  userName = `${firstName}${lastName}`;
  email = `${userName}@${randomNr}.com`;
  website = `${userName}.com`;
  password = `WeakPassword123AndSomeRandomCharacters456${randomNr}`;
  return {
    userName: userName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    website: website,
    password: password,
    role: userRole,
  };
}

let addUserPage: AddUserPage;

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("add user page", () => {
  test.beforeEach(async ({ page }) => {
    addUserPage = new AddUserPage(page);
    await page.goto(`/wp-admin/user-new.php`);
  });

  test("should add a new user when all required fields are filled", async ({
    page,
  }) => {
    const newUser = generateNewUser(UserRoles.Subscriber);

    await addUserPage.fillForm(
      newUser.userName,
      newUser.email,
    );
    await addUserPage.selectUserRole(newUser.role);
    await addUserPage.clickAddNewUserButton();

    await page.getByLabel("Search Users:").fill(newUser.userName);
    await page.getByRole("button", { name: "Search Users" }).click();

    await expect(page.getByText(newUser.email)).toBeVisible();
    await expect(
      page.getByRole("cell", { name: getUserRoleName(newUser.role) })
    ).toBeVisible();
    await expect(
      page.locator("tbody#the-list tr td.column-posts")
    ).toContainText("0");
  });
});
