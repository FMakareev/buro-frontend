import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import HeaderNav from './HeaderNav';
import { ROLE_BUREAU, ROLE_BANK, ROLE_CLIENT } from '../../shared/roles';
import TabController from '../TabController/TabController';

test('HeaderNav: Рендерится без пользователя', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <HeaderNav />
      </BrowserRouter>
    </StyledThemeProvider>,
  );

  expect(output.toJSON()).toMatchSnapshot();
});

test('HeaderNav: Рендерится меню для бюро', async () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <HeaderNav
          user={{
            role: ROLE_BUREAU,
          }}
        />
      </BrowserRouter>
    </StyledThemeProvider>,
  );

  // нашел компонент контроллер табов
  const TabControllerInstance = output.root.findByType(TabController).instance;
  // активировал меню
  TabControllerInstance.toggleTab(0);
  // небольшая задержка чтобы стейт успел обновится
  await wait(2);

  // проверка наличия кнопки Logout и сравнение её свойст
  expect(output.root.findByProps({ children: 'Logout' }).props).toEqual({
    children: 'Logout',
    to: '/logout',
  });

  // свойства прверяются по отдельности из-за того что нет возможности сравнить два объекта содержащих в одном из свойств компонент
  expect(output.root.findByProps({ children: 'Profile' }).props.children).toBe('Profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.to).toBe('/app/profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.icon).toBeInstanceOf(Object);

  expect(output.root.findByProps({ children: 'Clients' }).props.children).toBe('Clients');
  expect(output.root.findByProps({ children: 'Clients' }).props.to).toBe('/app/bureau/clients');
  expect(output.root.findByProps({ children: 'Clients' }).props.icon).toBeInstanceOf(Object);
});

test('HeaderNav: Рендерится меню для клиента', async () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <HeaderNav
          user={{
            role: ROLE_CLIENT,
          }}
        />
      </BrowserRouter>
    </StyledThemeProvider>,
  );

  const TabControllerInstance = output.root.findByType(TabController).instance;
  TabControllerInstance.toggleTab(0);
  await wait(2);

  expect(output.root.findByProps({ children: 'Logout' }).props).toEqual({
    children: 'Logout',
    to: '/logout',
  });

  expect(output.root.findByProps({ children: 'Profile' }).props.children).toBe('Profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.to).toBe('/app/profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.icon).toBeInstanceOf(Object);

  expect(output.root.findByProps({ children: 'Notifications' }).props.children).toBe(
    'Notifications',
  );
  expect(output.root.findByProps({ children: 'Notifications' }).props.to).toBe(
    '/app/client/notifications',
  );
  expect(output.root.findByProps({ children: 'Notifications' }).props.icon).toBeInstanceOf(Object);
});

test('HeaderNav: Рендерится меню для банка', async () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <HeaderNav
          user={{
            role: ROLE_BANK,
          }}
        />
      </BrowserRouter>
    </StyledThemeProvider>,
  );

  const TabControllerInstance = output.root.findByType(TabController).instance;
  TabControllerInstance.toggleTab(0);
  await wait(2);

  expect(output.root.findByProps({ children: 'Logout' }).props).toEqual({
    children: 'Logout',
    to: '/logout',
  });

  expect(output.root.findByProps({ children: 'Profile' }).props.children).toBe('Profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.to).toBe('/app/profile');
  expect(output.root.findByProps({ children: 'Profile' }).props.icon).toBeInstanceOf(Object);

  expect(output.root.findByProps({ children: 'Notifications' }).props.children).toBe(
    'Notifications',
  );
  expect(output.root.findByProps({ children: 'Notifications' }).props.to).toBe(
    '/app/bank/notifications',
  );
  expect(output.root.findByProps({ children: 'Notifications' }).props.icon).toBeInstanceOf(Object);

  expect(output.root.findByProps({ children: 'Clients' }).props.children).toBe('Clients');
  expect(output.root.findByProps({ children: 'Clients' }).props.to).toBe('/app/bank/clients');
  expect(output.root.findByProps({ children: 'Clients' }).props.icon).toBeInstanceOf(Object);
});
