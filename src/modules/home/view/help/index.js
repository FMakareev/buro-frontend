import React, { Component } from 'react';
import styled from 'styled-components';
import faker from 'faker';

import { Box } from '../../../../components/Box/Box';
import { Flex } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Text/Text';

import { FormSendQuestion } from './FormSendQuestion';

import TabController from '../../../../components/TabController/TabController';
import { Tabs } from '../../../../components/Tabs/Tabs';
import { TabContent } from '../../../../components/TabContent/TabContent';

import { SvgDropdownIndicator } from '../../../../components/Icons/SvgDropdownIndicator';

import { Title, StyledContainer } from './styled';

const QuestionTab = styled(Flex)`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 12px;
  justify-content: space-between;
  font-family: ${props => props.theme.fontFamily.bold};
  font-size: ${props => props.theme.fontSizes[6]}px;
  line-height: ${props => props.theme.lineHeight[9]}px;
  color: ${props => props.theme.colors.color1};
  background-color: ${props => props.theme.colors.color10};
  box-shadow: ${props => props.theme.boxShadow[1]};
  border-top: solid 2px ${props => props.theme.colors.color11};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  & > svg {
    transform: ${props => (props.active ? '' : 'rotate(180deg)')};
  }
`;

const ContentWrapper = styled(Text)`
  margin-top: -6px;
  padding-left: 20px;
  padding-top: 8px;
  padding-right: 30px;
  padding-bottom: 8px;
  font-size: ${props => props.theme.fontSizes[6]}px;
  line-height: ${props => props.theme.lineHeight[9]}px;
  text-indent: 10px;
  color: ${props => props.theme.colors.color12};
  background-color: ${props => props.theme.colors.color0};
  border: solid 1px ${props => props.theme.colors.color13};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export class HelpPage extends Component {
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
    const data = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <StyledContainer backgroundColor="transparent">
        <Box>
          <Title mb={6}>FAQ</Title>
          <Box mb={6}>
            {data.map(() => (
              <TabController defaultActiveTab={null} hideWhenReClicking mb="25px">
                <Tabs>
                  <QuestionTab mb={3}>
                    <Text>{faker.lorem.sentence()}</Text>
                    <SvgDropdownIndicator width="20px" height="20px" />
                  </QuestionTab>
                </Tabs>
                <TabContent>
                  <ContentWrapper mb={3}>{faker.lorem.paragraphs()}</ContentWrapper>
                </TabContent>
              </TabController>
            ))}
          </Box>
        </Box>
        <FormSendQuestion />
      </StyledContainer>
    );
  }
}

export default HelpPage;
