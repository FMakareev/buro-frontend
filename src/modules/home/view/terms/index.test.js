import React from 'react';
import renderer from 'react-test-renderer';
import {TermsPage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";


test('TermsPage: рендер без ошибок', () => {
  const output = renderer.create(<StyledThemeProvider>
    <TermsPage/>
  </StyledThemeProvider>)
  expect(output).toMatchSnapshot();
});

