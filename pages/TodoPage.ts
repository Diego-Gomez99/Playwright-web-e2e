import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  // Define properties for the page and its elements
  readonly page: Page;
  readonly inputBox: Locator;
  readonly todoItems: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Assign locators to the elements on the page
    this.inputBox = page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItems = page.locator('.todo-list li');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  // Define methods to interact with the page
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async completeTodo(text: string) {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: text })
      .getByLabel('Toggle Todo')
      .check();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}