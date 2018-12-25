import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Text } from '@lib/ui/Text/Text';
import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import UpdateNotificationMutation from './UpdateNotificationMutation.graphql';
// import { STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING } from '../../../../shared/statuses';
import { STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING } from '@lib/shared/statuses';
import {Box} from "@lib/ui/Box/Box";

/**
 * @desc Кнопки для вызова мутации ответов пользователя
 * */
export class UpdateNotificationButtons extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return { status: STATUS_PENDING };
  }

  render() {
    const { status } = this.state;
    const { id } = this.props;
    return (
      <Mutation mutation={UpdateNotificationMutation}>
        {(updatenotification, { called, data, error, loading }) => {
          /** появляется если called - запрос был вызван, !loading - загрузка не идет, !error - нет ошибок */
          if (called && !loading && !error && data) {
            if (data.updatenotification.notification.status === STATUS_APPROVAL) {
              return (
                <Text fontSize={6} color="color1">
                  Approved
                </Text>
              );
            }
            if (data.updatenotification.notification.status === STATUS_NOT_APPROVAL) {
              return (
                <Text fontSize={6} color="color1">
                  Not approved
                </Text>
              );
            }
          }
          return (
            <>
              <Box>
                <ButtonWithImage
                  disabled={loading}
                  onClick={() => {
                    updatenotification({ variables: { id, status: STATUS_APPROVAL } });
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
                    updatenotification({ variables: { id, status: STATUS_NOT_APPROVAL } });
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
              </Box>
              {
                error && <Text whiteSpace={'normal'} fontFamily={'medium'} fontSize={'12px'} lineHeight={'16px'} color={'color9'}>
                  Retry the request later, file not has been uploaded to the blockchain.
                </Text>
              }

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
