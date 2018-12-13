import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import Header from './Header';

test('Header: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </StyledThemeProvider>,
  );
});

test('Header: рендер компонента переданного в children', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <Header>
          <div>Component</div>
        </Header>
      </BrowserRouter>
    </StyledThemeProvider>,
  );

  expect(output.root.findByProps({ children: 'Component' }).props).toEqual({
    children: 'Component',
  });
});
