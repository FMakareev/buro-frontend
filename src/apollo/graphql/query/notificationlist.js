import faker from 'faker';
import { range } from '../../helpers/range';
import { notificationitem } from './notificationitem';

export const notificationlist = (query, props) =>
  range(100).map(() => notificationitem());

export default notificationlist;
