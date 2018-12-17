import React, { Component } from 'react';
import styled from 'styled-components';

import { color } from 'styled-system';
import { Box } from '@lib/ui/Box/Box';
import { Flex } from '@lib/ui/Flex/Flex';
import { Text } from '@lib/ui/Text/Text';

import FormSendQuestion from './FormSendQuestion';

import TabController from '@lib/ui/TabController/TabController';
import { Tabs } from '@lib/ui/Tabs/Tabs';
import { TabContent } from '@lib/ui/TabContent/TabContent';

import { SvgDropdownIndicator } from '@lib/ui/Icons/SvgDropdownIndicator';

import { StyledContainer } from './styled';
import { FontFamilyProperty } from '../../../../styles/styleProperty/FontFamilyProperty';
import { FontSizeProperty } from '../../../../styles/styleProperty/FontSizeProperty';
import { LineHeightProperty } from '../../../../styles/styleProperty/LineHeightProperty';
import { BackgroundColorProperty } from '../../../../styles/styleProperty/BackgroundColorProperty';
import { BoxShadowProperty } from '../../../../styles/styleProperty/BoxShadowProperty';
import { BorderColorProperty } from '../../../../styles/styleProperty/BorderColorProperty';

import { dummyData } from './dummyData';

const QuestionTab = styled(Flex)`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 12px;
  justify-content: space-between;

  ${props => FontFamilyProperty({ ...props, fontFamily: 'bold' })};
  ${props => FontSizeProperty({ ...props, fontSize: 6 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 9 })};
  ${props => color({ ...props, color: 'color1' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color10' })};
  ${props => BoxShadowProperty({ ...props, boxShadow: 1 })};

  border-top: solid 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  ${props => BorderColorProperty({ ...props, borderColor: 'color1' })};
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
  text-indent: 10px;
  ${props => FontSizeProperty({ ...props, fontSize: 6 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 9 })};
  ${props => color({ ...props, color: 'color12' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color0' })};
  border: solid 1px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  ${props => BorderColorProperty({ ...props, borderColor: 'color3' })};
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
    return (
      <StyledContainer backgroundColor="transparent">
        <Box>
          <Text fontSize={9} fontFamily="bold" lineHeight={11} color="color1" mb={6}>
            FAQ
          </Text>
          <Box mb={6}>
            {dummyData.map(el => (
              <TabController defaultActiveTab={null} hideWhenReClicking mb="25px">
                <Tabs>
                  <QuestionTab mb={3}>
                    <Text>{el.sentence}</Text>
                    <SvgDropdownIndicator width="20px" height="20px" />
                  </QuestionTab>
                </Tabs>
                <TabContent>
                  <ContentWrapper mb={3}>{el.paragraph}</ContentWrapper>
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
