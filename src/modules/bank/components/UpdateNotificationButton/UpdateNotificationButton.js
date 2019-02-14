import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Text } from '@lib/ui/Text/Text';
import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
// import { STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING } from '../../../../shared/statuses';
import { STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING } from '@lib/shared/statuses';
import { Box } from '@lib/ui/Box/Box';
import UpdateNotificationMutation from './UpdateNotificationMutation.graphql';

/**
 * @desc Кнопки для вызова мутации пометки нотификации прочитанной
 * */
export class UpdateNotificationButton extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  render() {
    const { id, status } = this.props;

    return (
      <Mutation mutation={UpdateNotificationMutation} onError={() => {}}>
        {(updatenotification, { called, data, error, loading }) => {
          /** появляется если called - запрос был вызван, !loading - загрузка не идет, !error - нет ошибок */
          if (called && !loading && !error && data) {
            if (data.updatenotification.notification.readed) {
              return <Text>Readed</Text>;
            }
          }
          return (
            <>
              <Box>
                <ButtonWithImage
                  disabled={loading}
                  onClick={() => {
                    updatenotification({ variables: { id, readed: true, status } });
                  }}
                  iconRight={
                    loading ? (
                      <Text fontSize={5} lineHeight={0} fill="inherit">
                        <SpeedingWheel />
                      </Text>
                    ) : null
                  }
                  display="inline-block"
                  size="xsmall"
                  testID="ButtonApprove"
                  variant={error ? 'error' : 'transparent'}
                  mr="5px"
                  ml="5px"
                  pl="3px"
                  pr="5px">
                  Mark as read
                </ButtonWithImage>
              </Box>
              {error && (
                <Text
                  testID="UpdateNotificationError"
                  whiteSpace="normal"
                  fontFamily="medium"
                  fontSize="12px"
                  lineHeight="16px"
                  color="color9">
                  Repeat the request in 10 minutes, file not has been uploaded to the blockchain.
                </Text>
              )}
            </>
          );
        }}
      </Mutation>
    );
  }
}

UpdateNotificationButton.propTypes = {
  /** id notification */
  id: PropTypes.string.isRequired,
  /** status of notification */
  status: PropTypes.oneOf([STATUS_NOT_APPROVAL, STATUS_APPROVAL, STATUS_PENDING]).isRequired,
};
export default UpdateNotificationButton;
