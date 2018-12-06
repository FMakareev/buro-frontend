import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query} from "react-apollo";
import {SvgBell} from "../Icons/SvgBell";
import {ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT} from "../../shared/roles";
import {CircleCount} from "./HeaderNotificationStyled";
import {ButtonStyled} from "./HeaderNotificationStyled";
import {CheckAuthorization} from "../CheckAuthorization/CheckAuthorization";
import NotificationListQuery from './NotificationListQuery.graphql';
import {getUserFromStore} from "../../store/reducers/user/selectors";
import {withRouter} from "react-router-dom";

@withRouter
@connect((state) => ({
  user: getUserFromStore(state),
}))
@CheckAuthorization([ROLE_CLIENT, ROLE_BANK])
export class HeaderNotification extends Component {

  redirectToNotificationList = () => {
    const {user, history} = this.props;

    try {
      if (user) {
        if (user.role === ROLE_BANK) {
          history.push('/app/bank/notifications')
        } else if (user.role === ROLE_CLIENT) {
          history.push('/app/client/notifications');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {user} = this.props;
    /** если пользователь есть, нет ошибок и он бюро то не рендерим компонент */
    if (user && !user.error && user.role === ROLE_BUREAU) {
      return null;
    }
    return (<Query
      query={NotificationListQuery}
      variables={{
        id: user.id,
      }}
    >
      {
        ({error, loading, data}) => {
          return (<ButtonStyled
            onClick={this.redirectToNotificationList}
            disabled={loading || error}
            fill={loading ? 'color5' : 'color1'}
            as={'button'}
            fontSize={'40px'}
          >
            {
              !loading && !error &&
              <CircleCount>
                {data.notificationList.length}
              </CircleCount>
            }
            <SvgBell/>
          </ButtonStyled>)
        }
      }
    </Query>)
  }
}

export default HeaderNotification;
