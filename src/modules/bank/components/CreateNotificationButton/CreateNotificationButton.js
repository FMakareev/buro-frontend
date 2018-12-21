import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Text } from '@lib/ui/Text/Text';
import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import CreateNotificationMutation from './CreateNotificationMutation.graphql';

import { STATUS_PENDING } from '../../../../shared/statuses';

/**
 * @desc Кнопка для вызова мутации создания уведомления к пользователю
 * */
export const CreateNotificationButton = ({ children, clientid, bankid }) => (
  <Mutation mutation={CreateNotificationMutation}>
    {(mutation, { called, data, error, loading }) => {
      /** появляется если called - запрос был вызван, !loading - загрузка не идет, !error - нет ошибок */
      if (called && !loading && !error) {
        return (
          <Text fontSize={6} color="color1">
            Pending approval
          </Text>
        );
      }
      return (
        <ButtonWithImage
          disabled={loading}
          onClick={() => mutation({ variables: { clientid, bankid} })}
          display="inline-block"
          iconRight={
            loading ? (
              <Text fontSize={5} lineHeight={0} fill="inherit">
                <SpeedingWheel />
              </Text>
            ) : null
          }
          size="xsmall"
          variant={error ? 'error' : 'transparent'}
          pl="3px"
          pr="5px">
          {children}
        </ButtonWithImage>
      );
    }}
  </Mutation>
);
CreateNotificationButton.propTypes = {
  /** id банка */
  bankid: PropTypes.string.isRequired,
  /** id клиента */
  clientid: PropTypes.string.isRequired,
};
export default CreateNotificationButton;
