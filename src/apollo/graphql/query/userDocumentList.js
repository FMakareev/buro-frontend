import faker from "faker";
import {range} from '../../helpers/range';
import {userItem} from "./userItem";
import {documentItem} from "./documentItem";


export const userDocumentList = (query, props) => {
  return range(faker.random.number(100)).map(d => {
    return {
      id: faker.random.uuid(),
      user: userItem(),
      document: faker.random.number(1) ? range(faker.random.number(10)).map(d => {
        return documentItem();
      }) : null,
    };
  });
};
