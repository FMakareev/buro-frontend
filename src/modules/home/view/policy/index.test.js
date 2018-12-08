import React from 'react';
import renderer from 'react-test-renderer';
import {PolicyPage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";


test('PolicyPage: рендер без ошибок', () => {
  const output = renderer.create(<StyledThemeProvider>
    <PolicyPage/>
  </StyledThemeProvider>);
  expect(output).toMatchSnapshot();
});

