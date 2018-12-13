import register from 'ignore-styles';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as ProviderRedux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { DocumentsBureauPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

import { Store } from '../../../../store';

test('DocumentsBureauPage: проверка ошибок во время рендера', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <BrowserRouter>
          <DocumentsBureauPage />
        </BrowserRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
});
