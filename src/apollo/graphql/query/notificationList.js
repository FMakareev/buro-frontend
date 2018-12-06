import faker from 'faker';
import { range } from '../../helpers/range';
import { userItem } from './userItem';
import { notificationItem } from './notificationItem';

export const notificationList = (query, props) =>
  range(faker.random.number(50)).map(
    () => notificationItem(),
    // id: faker.random.uuid(),
    // user: userItem(),
  );

export default notificationList;
