import register from 'ignore-styles';
import React from 'react';
import renderer from 'react-test-renderer';
import faker from "faker";

import ButtonTriggerGroup from "./ButtonTriggerGroup";
import {StyledThemeProvider} from "../../styles/StyledThemeProvider";

const options = new Array(3).map(item =>({
  label: faker.random.word(),
  value: faker.random.word(),
}));

test('ButtonTriggerGroup: проверка ошибок во время рендера', () => {
  renderer.create(<StyledThemeProvider >
    <ButtonTriggerGroup options={options}/>
  </StyledThemeProvider>)
});
