import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as ProviderRedux } from 'react-redux';
import { HelpPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { Store } from '../../../../store';

test('HelpPage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ProviderRedux store={Store}>
        <HelpPage />
      </ProviderRedux>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
