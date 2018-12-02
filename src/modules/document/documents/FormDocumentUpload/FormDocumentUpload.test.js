import register from 'ignore-styles';
import React from 'react';
import renderer from 'react-test-renderer';
import {FormDocumentUpload} from './FormDocumentUpload';
import {StyledThemeProvider} from "../../../../styles/StyledThemeProvider";


test('FormDocumentUpload: проверка ошибок во время рендера', () => {
  renderer.create(<StyledThemeProvider>
    <FormDocumentUpload/>
  </StyledThemeProvider>)
});
