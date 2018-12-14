import faker from 'faker';
import { useritem } from './useritem';
import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../shared/statuses';

export const notificationItem = () => ({
  id: faker.random.uuid(),
  status: faker.random.arrayElement([STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL]),
  date: faker.date.past().toUTCString(),
  bank: useritem(),
  client: useritem(),
});

export default notificationItem;
