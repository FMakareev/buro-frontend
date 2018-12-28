import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Text } from '@lib/ui/Text/Text';
import { SpeedingWheel } from '@lib/ui/SmallPreloader/SmallPreloader';
import CreateNotificationMutation from './CreateNotificationMutation.graphql';


/**
 * @desc Кнопка для вызова мутации создания уведомления к пользователю
 * */
export const CreateNotificationButton = ({ children, client, bank }) => (
  <Mutation mutation={CreateNotificationMutation} onError={()=>{}}>
    {(mutate, { called, data, error, loading }) => {
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
          onClick={() => mutate({ variables: { client, bank } })}
          display="inline-block"
          iconRight={
            loading ? (
              <Text fontSize={5} lineHeight={0} fill="inherit">
                <SpeedingWheel />
              </Text>
            ) : null
          }
          size="xsmall"
          testID={'CreateNotificationButton'}
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
