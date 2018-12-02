import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import HeaderNav from './HeaderNav';

test('HeaderNav: Рендерится без ошибок', () => {
  renderer
    .create(
      <StyledThemeProvider>
        <BrowserRouter>
          <HeaderNav />
        </BrowserRouter>
      </StyledThemeProvider>,
    )
});
