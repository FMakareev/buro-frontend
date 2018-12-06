import React from 'react';
import {Redirect} from "react-router-dom";
// TODO: доделать редирект на страницу с ошибкой доступа или просто поставить компонент
/**
 * @param {array} role - массив ролей у которых есть доступ к компоненту
 * @param {object} AccessDeniedCallback - компонент кторый должен быть отображен в случае ошибки
 * @desc
 * */
export const CheckAuthorization = (role = [], AccessDeniedCallback = null) => WrappedComponent => {

  return (props) => {
    try {
      const {user} = props;
      console.log('user: ', user);
      if (!user || (user && user.error)) {
        return <Redirect to={'/logout'}/>
      }
      if (user && user.initLoading) {
        return null;
      }
      if ((user && role.length) && !role.filter(item => item === user.role).length) {
        return AccessDeniedCallback;
      }
    } catch (error) {
      console.log(error);
    }
    return (<WrappedComponent {...props} />);
  }
};

export default CheckAuthorization;
