import faker from 'faker';
import { range } from '../../helpers/range';
import { notificationItem } from './notificationItem';

export const notificationlist = (query, props) =>
  range(faker.random.number(faker.random.number(30))).map(() => notificationItem());

export default notificationlist;
