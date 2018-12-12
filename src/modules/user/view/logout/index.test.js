import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import mocksClient from '../../../../apollo/mocksClient';

import { LoginPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { Store } from '../../../../store';

test('LoginPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <BrowserRouter>
          <ApolloProvider client={mocksClient}>
            <LoginPage />
          </ApolloProvider>
        </BrowserRouter>
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
