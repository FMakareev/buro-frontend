import faker from 'faker';
import { userItem } from './userItem';
import { STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL } from '../../../shared/statuses';

export const notificationItem = () => ({
  id: faker.random.uuid(),
  status: faker.random.arrayElement([STATUS_PENDING, STATUS_APPROVAL, STATUS_NOT_APPROVAL]),
  date: faker.date.past().toUTCString(),
  bank: userItem(),
  client: userItem(),
});

export default notificationItem;
