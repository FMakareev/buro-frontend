import React, {Component} from 'react';
import {Mutation, Query} from "react-apollo";
import CheckUserDocumentQuery from './CheckUserDocumentQuery.graphql';
import RequestDocumentFromBureauMutation from './RequestDocumentFromBureauMutation.graphql';
import {getUserFromStore} from "../../../../store/reducers/user/selectors";
import {connect} from "react-redux";
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import {LoadingComponent} from "@lib/ui/ReactTableStyled/LoadingComponent";
import {ROLE_BUREAU} from "@lib/shared/roles";
import {Relative} from "@lib/ui/Relative/Relative";

export class CheckUserDocument extends Component {
  render() {
    const {user} = this.props;
    console.log('CheckUserDocument: ', this.props);
    return (<Relative>
      <Query
        query={CheckUserDocumentQuery}
        variables={{
          client: user.id,
        }}
      >
        {
          ({data, loading, error}) => {
            console.log('CheckUserDocument: ', data, loading, error);
            if(loading){
              return <LoadingComponent/>
            }
            if (!data.checkuserdocument) {
              return (<Mutation
                mutation={RequestDocumentFromBureauMutation}
              >
                {
                  (mutation, {loading, called, ...rest})=>{
                    console.log(rest);
                    if(loading){
                      return <LoadingComponent/>
                    }
                    if(called){
                      return null;
                    }
                    return (<ButtonBase
                      onClick={()=>{
                        mutation({
                          variables: {
                            client: user.id,
                            message: 'Client requested a credit history.',
                          }
                        })
                      }}
                      display="block"
                      type="submit"
                      variant="primary"
                      size="small"
                      px={102}
                      py={2}
                    >
                      Request a credit history
                    </ButtonBase>)
                  }
                }
              </Mutation>);
            } else {
              return null;
            }
          }
        }
      </Query>
    </Relative>)
  }
}

CheckUserDocument = connect(
  state => ({
    user: getUserFromStore(state),
  }),
)(CheckUserDocument);

export default CheckUserDocument;
