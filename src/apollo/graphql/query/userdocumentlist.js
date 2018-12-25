import faker from 'faker';
import { range } from '../../helpers/range';
import { useritem } from './userItem';
import { ROLE_BANK, ROLE_CLIENT } from '../../../shared/roles';
import { STATUS_DOWNLOADED, STATUS_NEED_UPDATE } from '../../../shared/statuses';
import {userdocumentitem} from "./userdocumentitem";

export const userdocumentlist = (query, props) =>
  range(faker.random.number(100)).map(d => userdocumentitem());
