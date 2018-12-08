import React from 'react';
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';
import mocksClient from "../../../../apollo/mocksClient";

import {MemoryRouter} from 'react-router-dom';
import {PasswordRecovery} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";
import {Provider as ProviderRedux} from 'react-redux';
import {Store} from '../../../../store';


test('PasswordRecovery: без параметров адресной строки', () => {
  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={Store}>
      <MemoryRouter>
        <ApolloProvider client={mocksClient}>
          <PasswordRecovery/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

test('PasswordRecovery: рендер с параметрами строки', () => {
  const output = renderer.create(<StyledThemeProvider>
    <ProviderRedux store={Store}>
      <MemoryRouter
        initialEntries={["/password-recovery"]}
        initialIndex={0}
      >
        <ApolloProvider client={mocksClient}>
          <PasswordRecovery match={{
            params: {
              token: 'aasc3faw3wesegfw5gdefzsegyd'
            }
          }}/>
        </ApolloProvider>
      </MemoryRouter>
    </ProviderRedux>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

