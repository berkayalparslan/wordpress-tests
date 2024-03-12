import { Page, Locator, Frame, FrameLocator } from "@playwright/test";

export default class AddPostPage {
  readonly page: Page;
  readonly titleEl: Locator;
  readonly blockEl: Locator;
  readonly publishBtn: Locator;
  readonly saveDraftBtn: Locator;
  readonly editorPublishBtn: Locator;
  readonly viewPostBtn: Locator;
  readonly previewBtn: Locator;
  readonly viewPreviewLink: Locator;
  readonly editorCanvasFrame: FrameLocator;

  constructor(page:Page){
    this.page = page;
    this.titleEl = this.page
      .frameLocator('iframe[name="editor-canvas"]')
      .getByLabel("Add title");
    this.blockEl = page
      .frameLocator('iframe[name="editor-canvas"]')
      .locator('div.wp-block-post-content p').first();
    this.publishBtn = page.getByRole("button", {
      name: "Publish",
      exact: true,
    });
    this.saveDraftBtn = page.getByLabel("Save draft");
    this.editorPublishBtn = page
      .getByLabel("Editor publish")
      .getByRole("button", { name: "Publish", exact: true });
    this.viewPostBtn = page.locator("a.components-button.is-primary", {
      hasText: "View",
    });
    this.previewBtn = page.getByLabel("Preview");
    this.viewPreviewLink = page.getByRole("link", { name: "View Preview" });
    this.editorCanvasFrame =  page.frameLocator('iframe[name="editor-canvas"]');
  }

  async fillTitle(title: string) : Promise<void>{
    await this.titleEl.pressSequentially(title);
  }

  async fillEmptyBlock(block: string) {
    await this.blockEl.pressSequentially(block);
  }

  async clickPublishBtn() {
    await this.publishBtn.click();
  }

  async clickEditorPublishBtn() {
    await this.editorPublishBtn.click();
  }
}
