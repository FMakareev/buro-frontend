import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { STATUS_PENDING } from '@lib/shared/statuses';
import { SvgBell } from '../Icons/SvgBell';
import { SvgBellEmpty } from '../Icons/SvgBellEmpty';
import { ROLE_BANK, ROLE_BUREAU, ROLE_CLIENT } from '../../shared/roles';
import { CircleCount } from './HeaderNotificationStyled';
import { ButtonStyled } from './HeaderNotificationStyled';
import { CheckAuthorization } from '../CheckAuthorization/CheckAuthorization';
import NotificationListQuery from './NotificationListQuery.graphql';
import { getUserFromStore } from '../../store/reducers/user/selectors';

const has = Object.prototype.hasOwnProperty;

export class HeaderNotification extends Component {
  redirectToNotificationList = () => {
    const { user, history } = this.props;

    try {
      if (user) {
        if (user.role === ROLE_BANK) {
          history.push('/app/bank/notifications');
        } else if (user.role === ROLE_CLIENT) {
          history.push('/app/client/notifications');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  renderBell = ({ error, loading, data, user }) => {
    if (!loading && !error && has.call(data, 'notificationlist') && data.notificationlist.length) {
      const numberUnreadNotifications =
        user.role === ROLE_CLIENT
          ? this.countClientsNotifications(data.notificationlist)
          : data.notificationlist.length;
      return (
        <>
          <CircleCount>{numberUnreadNotifications}</CircleCount>
          {numberUnreadNotifications ? <SvgBell /> : <SvgBellEmpty />}
        </>
      );
    }
    return <SvgBellEmpty />;
  };

  countClientsNotifications = data => {
    let counter = 0;

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].status === STATUS_PENDING) {
        counter += 1;
      }
    }

    return counter;
  };

  render() {
    const { user } = this.props;
    /** если пользователь есть, нет ошибок и он бюро то не рендерим компонент */
    if (user && !user.error && user.role === ROLE_BUREAU) {
      return null;
    }
    if (!user || user.error) {
      return null;
    }
    return (
      <Query
        query={NotificationListQuery}
        pollInterval={5000}
        variables={{
          // status:STATUS_PENDING,
          ...(user.role === ROLE_CLIENT ? { clientid: user.id } : { bankid: user.id }),
        }}
        onError={() => {}}>
        {({ error, loading, data }) => (
          <ButtonStyled
            onClick={this.redirectToNotificationList}
            disabled={loading || error}
            fill={loading ? 'color5' : 'color1'}
            as="button"
            fontSize="40px">
            {this.renderBell({ error, loading, data, user })}
          </ButtonStyled>
        )}
      </Query>
    );
  }
}

HeaderNotification = withRouter(HeaderNotification);
HeaderNotification = CheckAuthorization([ROLE_CLIENT, ROLE_BANK])(HeaderNotification);
HeaderNotification = connect(state => ({
  user: getUserFromStore(state),
}))(HeaderNotification);
export default HeaderNotification;
