import React from 'react';
import renderer from 'react-test-renderer';
import {HelpPage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";


test('HelpPage: рендер без ошибок', () => {
  const output = renderer.create(<StyledThemeProvider>
    <HelpPage/>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

