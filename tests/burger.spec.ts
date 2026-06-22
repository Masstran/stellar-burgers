import { test, expect } from '@playwright/test';
import { Simulate } from 'react-dom/test-utils';
import pause = Simulate.pause;

test.beforeEach(async ({ page }) => {
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: '**/ingredients',
    update: false
  });
});

test.describe('Constructor page', () => {
  // test('Page opens, list loads', async ({ page }) => {
  //   await page.goto('/');
  //
  //   await expect(page.getByTestId('ingredients-list')).toBeVisible();
  // });
  //
  // test('Should add main when clicked', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('main-643d69a5c3f7b9001cfa0941');
  //   await expect(ingredient).toBeVisible();
  //   await expect(ingredient).toContainText(
  //     'Биокотлета из марсианской Магнолии'
  //   );
  //   const constructor_ingredient = page.getByTestId('constructor-ingredient-0');
  //   await expect(constructor_ingredient).not.toBeVisible();
  //   await ingredient.getByRole('button', { name: 'Добавить' }).click();
  //   await expect(constructor_ingredient).toBeVisible();
  //   await expect(constructor_ingredient).toContainText(
  //     'Биокотлета из марсианской Магнолии'
  //   );
  // });
  //
  // test('Should add sauce when clicked', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('sauce-643d69a5c3f7b9001cfa0942');
  //   await expect(ingredient).toBeVisible();
  //   await expect(ingredient).toContainText('Соус Spicy-X');
  //   const constructor_ingredient = page.getByTestId('constructor-ingredient-0');
  //   await expect(constructor_ingredient).not.toBeVisible();
  //   await ingredient.getByRole('button', { name: 'Добавить' }).click();
  //   await expect(constructor_ingredient).toBeVisible();
  //   await expect(constructor_ingredient).toContainText('Соус Spicy-X');
  // });
  //
  // test('Should add bun when clicked', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('bun-643d69a5c3f7b9001cfa093d');
  //   await expect(ingredient).toBeVisible();
  //   await expect(ingredient).toContainText('Флюоресцентная булка R2-D3');
  //   const bun_top = page.getByTestId('constructor-bun-top');
  //   await expect(bun_top).not.toBeVisible();
  //   const bun_bottom = page.getByTestId('constructor-bun-bottom');
  //   await expect(bun_bottom).not.toBeVisible();
  //   await ingredient.getByRole('button', { name: 'Добавить' }).click();
  //   await expect(bun_top).toBeVisible();
  //   await expect(bun_top).toContainText('Флюоресцентная булка R2-D3');
  //   await expect(bun_bottom).toBeVisible();
  //   await expect(bun_bottom).toContainText('Флюоресцентная булка R2-D3');
  // });
  //
  // test('Should open modal on ingredient click', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('main-643d69a5c3f7b9001cfa0941');
  //   await ingredient.click();
  //   await expect(page.getByTestId('modal')).toBeVisible();
  // });
  //
  // test('Should close modal on x click', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('main-643d69a5c3f7b9001cfa0941');
  //   await ingredient.click();
  //   const modal = page.getByTestId('modal');
  //   await expect(modal).toBeVisible();
  //   const xButton = page.getByTestId('modal-close');
  //   await xButton.click();
  //   await expect(modal).not.toBeVisible();
  // });
  //
  // test('Should close modal on overlay', async ({ page }) => {
  //   await page.goto('/');
  //
  //   const ingredient = page.getByTestId('main-643d69a5c3f7b9001cfa0941');
  //   await ingredient.click();
  //   const modal = page.getByTestId('modal');
  //   await expect(modal).toBeVisible();
  //   const overlay = page.getByTestId('modal-overlay');
  //   await overlay.click({ position: { x: 0, y: 0 } });
  //   await expect(modal).not.toBeVisible();
  // });

  test('Should be able to order', async ({ context, page }) => {
    await page.routeFromHAR('./e2e/hars/auth_user.har', {
      url: '**/auth/user',
      update: false
    });

    await page.routeFromHAR('./e2e/hars/orders.har', {
      url: '**/orders',
      update: false
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'i_am_a_criminal',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/');

    await page
      .getByTestId('bun-643d69a5c3f7b9001cfa093c')
      .getByRole('button', { name: 'Добавить' })
      .click();
    await page
      .getByTestId('main-643d69a5c3f7b9001cfa093e')
      .getByRole('button', { name: 'Добавить' })
      .click();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    const order_number = page.getByTestId('order-number');
    await expect(order_number).toBeVisible();
    await expect(order_number).toContainText('9567');
    await expect(page.getByTestId('constructor-bun-top')).not.toBeVisible();
    await expect(page.getByTestId('constructor-bun-bottom')).not.toBeVisible();
    await expect(
      page.getByTestId('constructor-ingredient-0')
    ).not.toBeVisible();

    await page.getByTestId('modal-close').click();
    await expect(modal).not.toBeVisible();
  });
});
