import faker from 'faker';
import { useritem } from './userItem';
import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../shared/statuses';

export const notificationitem = () => ({
  id: faker.random.uuid(),
  status: faker.random.arrayElement([STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL]),
  date: faker.date.past().toUTCString(),
  bank: useritem(),
  message: 'Client requested a credit history.',
  client: useritem(),
});

export default notificationitem;
