import faker from 'faker';
import { range } from '../../helpers/range';
import { notificationitem } from './notificationitem';

export const notificationlist = (query, props) =>
  range(faker.random.number(faker.random.number(30))).map(() => notificationitem());

export default notificationlist;
