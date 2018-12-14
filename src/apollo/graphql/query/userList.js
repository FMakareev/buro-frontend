import {range} from '../../helpers/range';
import {useritem} from "./useritem";


export const userlist = (query, props) => {
  return range(100).map(d => {
    return useritem();
  });
};
