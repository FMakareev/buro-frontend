import React, { Component } from 'react';
import {Text} from "@lib/ui/Text/Text";
import {Container} from "@lib/ui/Container/Container";


export class PolicyPage extends Component {
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
    return (
      <Container backgroundColor={'transparent'} px={6}>
        <Text fontFamily={'bold'} fontWeight={'bold'} fontSize={9} lineHeight={9} mb={7}>
          Private policy
        </Text>

      </Container>
    );
  }
}

export default PolicyPage;
