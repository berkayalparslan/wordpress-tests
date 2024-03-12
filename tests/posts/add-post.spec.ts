// @ts-check
import {test, expect} from '@playwright/test';
import AddPostPage from '../../pages/posts/add-post.page';

test.use({ storageState: 'playwright/.auth/user.json' });

let addPostPage;

test.describe('add post page', () => {
    test.beforeEach(async({page}) => {
        await page.goto(`/wp-admin/post-new.php`);
        addPostPage = new AddPostPage(page);
    })

    test('should allow to add a new post when title and content is provided', async({page}) => {
        const title = 'new post title';
        const content = 'this is a new post';

        await addPostPage.fillTitle(title);
        await addPostPage.fillEmptyBlock(content);
        await addPostPage.clickPublishBtn();
        await addPostPage.clickEditorPublishBtn();
        await page.getByLabel('Dismiss this notice').getByRole('link', { name: 'View Post' }).click();

        await page.getByRole('heading', { name: title }).isVisible();
        await page.getByText(content).isVisible();
        await page.getByRole('link', { name: 'Uncategorized' }).isVisible();
    });
})