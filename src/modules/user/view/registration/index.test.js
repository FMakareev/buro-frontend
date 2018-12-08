import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import mocksClient from "../../../../apollo/mocksClient";

import { BrowserRouter } from 'react-router-dom';
import {RegistrationPage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";
import {Provider as ProviderRedux} from 'react-redux';
import { Store } from '../../../../store';


test('RegistrationPage: рендер без ошибок', () => {
  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={Store}>
      <BrowserRouter>
        <ApolloProvider client={mocksClient}>
          <RegistrationPage/>
        </ApolloProvider>
      </BrowserRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

