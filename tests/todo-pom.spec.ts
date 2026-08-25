import { test, expect} from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('Complete workflow using Page Object Model', async ({ page }) => {
    // We instanciate the TodoPage class
    const todoPage = new TodoPage(page);

    //WE execute clean and readable actions
    await todoPage.goto();
    await todoPage.addTodo('Run');
    await todoPage.addTodo('Sleep');

    await todoPage.completeTodo('Sleep');
    await todoPage.clearCompleted();

    // Validate after clean the complete tasks, only 1 element left pending ('Run')
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText('Run');
    await expect(todoPage.clearCompletedButton).toBeHidden();
}); 
