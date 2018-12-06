import faker from 'faker';
import { range } from '../../helpers/range';
import { notificationItem } from './notificationItem';

export const notificationList = (query, props) =>
  range(faker.random.number(50)).map(() => notificationItem());

export default notificationList;
