import faker from 'faker';
import { userItem } from './userItem';

export const notificationItem = () => ({
  id: faker.random.uuid(),
  status: faker.random.arrayElement(['answered', 'not_answered']),
  date: faker.date.past().toUTCString(),
  bank: userItem(),
  client: userItem(),
});

export default notificationItem;
