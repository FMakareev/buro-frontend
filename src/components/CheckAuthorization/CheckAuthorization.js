import React from 'react';
import {Redirect} from "react-router-dom";
// TODO: доделать редирект на страницу с ошибкой доступа или просто поставить компонент
/**
 * @param {string} role -
 * @desc
 * */
export const CheckAuthorization = (role) => WrappedComponent => {

  return (props) => {
    const {user} = props;
    if (!user || (user && user.error)) {
      return <Redirect to={'/logout'}/>
    }
    if(user && user.initLoading){
      return null;
    }
    if((user && role) && user.role !== role){
      return <div>Доступ закрыт</div>;
    }
    return (<WrappedComponent {...props} />);
  }
};

export default CheckAuthorization;
