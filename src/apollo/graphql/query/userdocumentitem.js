import faker from 'faker';
import {range} from '../../helpers/range';
import {useritem} from './userItem';
import {ROLE_BANK, ROLE_CLIENT} from '../../../shared/roles';
import {STATUS_DOWNLOADED, STATUS_NEED_UPDATE} from '../../../shared/statuses';
import {transactionlist} from "./transactionlist";

export const userdocumentitem = (query, props) => {
  const status = faker.random.number(1) ? STATUS_DOWNLOADED : STATUS_NEED_UPDATE;

  return {
    id: faker.random.uuid(),
    client: {...useritem(), role: ROLE_CLIENT},
    owner: {...useritem(), role: ROLE_BANK},
    date: faker.date.past().toISOString(),
    transactionlist: transactionlist(),
    status,
  };
};
export default userdocumentitem;
