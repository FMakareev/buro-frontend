import {range} from '../../helpers/range';
import {userItem} from "./userItem";


export const userList = (query, props) => {
  return range(100).map(d => {
    return userItem();
  });
};
