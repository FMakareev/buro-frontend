import {range} from "../../helpers/range";
import faker from 'faker';

export const transactionlist = () => {
  return range(5).map(() =>({
    name: faker.random.uuid()
  }));
}
