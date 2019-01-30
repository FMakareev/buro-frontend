import faker from 'faker';
import {useritem} from './userItem';
import {STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL} from '../../../shared/statuses';
import {ROLE_BANK, ROLE_BUREAU} from "@lib/shared/roles";

export const notificationitem = () => {

  const isBureau = faker.random.boolean();
  return ({
    id: faker.random.uuid(),
    status: faker.random.arrayElement([STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL]),
    date: faker.date.past().toUTCString(),
    message: 'Client requested a credit history.',
    client: useritem(),
    bank: isBureau ? null : {
      ...useritem(),
      role: ROLE_BANK,
      bankName: ROLE_BANK,
    },
    bureau: isBureau ? {
      ...useritem(),
      role: ROLE_BUREAU
    } : null,
  });
}

export default notificationitem;
