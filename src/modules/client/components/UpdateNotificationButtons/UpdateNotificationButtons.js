import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import UpdateNotificationMutation from './UpdateNotificationMutation.graphql';
import { ButtonWithImage } from '../../../../components/ButtonWithImage/ButtonWithImage';
import { Text } from '../../../../components/Text/Text';
import { SpeedingWheel } from '../../../../components/SmallPreloader/SmallPreloader';
import { STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING } from '../../../../shared/statuses';

/**
 * @desc Кнопки для вызова мутации ответов пользователя
 * */
export class UpdateNotificationButtons extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      status: STATUS_PENDING,
    };
  }

  render() {
    const { id } = this.props;
    const { status } = this.state;
    return (
      <Mutation mutation={UpdateNotificationMutation}>
        {(updateNotification, { called, date, error, loading }) => {
          console.log('Mutation: called', called);
          console.log('Mutation: date', date);
          console.log('Mutation: loading', loading);
          console.log('Mutation: error', error);
          /** появляется если called - запрос был вызван, !loading - загрузка не идет, !error - нет ошибок */
          if (called && !loading && !error) {
            if (status === STATUS_APPROVAL) {
              return (
                <Text fontSize={6} color="color1">
                  Approved
                </Text>
              );
            }
            if (status === STATUS_NOT_APPROVAL) {
              return (
                <Text fontSize={6} color="color1">
                  Not approved
                </Text>
              );
            }
          }
          return (
            <>
              <ButtonWithImage
                disabled={loading}
                onClick={() => {
                  updateNotification({ variables: { id, STATUS_APPROVAL } });
                  this.setState({ status: STATUS_APPROVAL });
                }}
                iconRight={
                  loading && status === STATUS_APPROVAL ? (
                    <Text fontSize={5} lineHeight={0} fill="inherit">
                      <SpeedingWheel />
                    </Text>
                  ) : null
                }
                display="inline-block"
                size="xsmall"
                variant={error && status === STATUS_APPROVAL ? 'error' : 'transparent'}
                mr="5px"
                ml="5px"
                pl="3px"
                pr="5px">
                Approve
              </ButtonWithImage>
              <ButtonWithImage
                disabled={loading}
                onClick={() => {
                  updateNotification({ variables: { id, STATUS_NOT_APPROVAL } });
                  this.setState({ status: STATUS_NOT_APPROVAL });
                }}
                iconRight={
                  loading && status === STATUS_NOT_APPROVAL ? (
                    <Text fontSize={5} lineHeight={0} fill="inherit">
                      <SpeedingWheel />
                    </Text>
                  ) : null
                }
                display="inline-block"
                size="xsmall"
                variant={error && status === STATUS_NOT_APPROVAL ? 'error' : 'transparent'}
                mr="5px"
                ml="5px"
                pl="3px"
                pr="5px">
                Not approve
              </ButtonWithImage>
            </>
          );
        }}
      </Mutation>
    );
  }
}

UpdateNotificationButtons.propTypes = {
  /** id notification */
  id: PropTypes.string.isRequired,
};
export default UpdateNotificationButtons;
