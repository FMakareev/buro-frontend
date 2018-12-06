import register from 'ignore-styles';
import React from 'react';
import renderer from 'react-test-renderer';
import {DocumentsBureauPage} from './index';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";


test('DocumentsBureauPage: проверка ошибок во время рендера', () => {
  renderer.create(<StyledThemeProvider>
    <DocumentsBureauPage/>
  </StyledThemeProvider>)
});
