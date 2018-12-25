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
export const CreateNotificationButton = ({ children, client, bank }) => (
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
<<<<<<< HEAD
          onClick={() => mutation({ variables: { client, bank, status: STATUS_PENDING } })}
=======
          onClick={() => mutation({ variables: { clientid, bankid} })}
>>>>>>> 89febb4d6809ed26e634b4622ad08db1d4d104ea
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
  bank: PropTypes.string.isRequired,
  /** id клиента */
  client: PropTypes.string.isRequired,
};
export default CreateNotificationButton;
