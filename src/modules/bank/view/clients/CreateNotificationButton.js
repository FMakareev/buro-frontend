import React from 'react';
import PropTypes from 'prop-types';
import CreateNotificationMutation from './CreateNotificationMutation.graphql';
import {Mutation} from "react-apollo";
import {ButtonWithImage} from "../../../../components/ButtonWithImage/ButtonWithImage";
import {Text} from "../../../../components/Text/Text";
import {SpeedingWheel} from "../../../../components/SmallPreloader/SmallPreloader";

/**
 * @desc Кнопка для вызова мутации создания уведомления к пользователю
 * */
export const CreateNotificationButton = ({children, id}) => {
  return (<Mutation mutation={CreateNotificationMutation}>
      {(createNotification, {called, date, error, loading}) => {
        console.log('Mutation: called', called);
        console.log('Mutation: date', date);
        console.log('Mutation: loading', loading);
        console.log('Mutation: error', error);
        /** появляется если called - запрос был вызван, !loading - загрузка не идет, !error - нет ошибок*/
        if (called && !loading && !error) {
          return (<Text fontSize={6} color={'color1'}>
            Pending approval
          </Text>)
        }
        return (
          <ButtonWithImage
            disabled={loading}
            onClick={() => {
              createNotification({variables: {id}})
            }}
            display={"inline-block"}
            iconRight={
              loading ? <Text fontSize={5} lineHeight={0} fill="inherit">
                <SpeedingWheel/>
              </Text> : null
            }
            size={"xsmall"}
            variant={error ? "error" : "transparent"}
            pl={"3px"}
            pr={"5px"}>
            {children}
          </ButtonWithImage>
        )

      }}
    </Mutation>
  )
};
CreateNotificationButton.propTypes = {
  /** id банка */
  id: PropTypes.string.isRequired,
};
export default CreateNotificationButton;
