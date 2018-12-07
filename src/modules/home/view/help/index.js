import React, {Component} from 'react';
import styled from 'styled-components';
import faker from 'faker';

import {Box} from '../../../../components/Box/Box';
import {Flex} from '../../../../components/Flex/Flex';
import {Text} from '../../../../components/Text/Text';

import {FormSendQuestion} from './FormSendQuestion';

import TabController from '../../../../components/TabController/TabController';
import {Tabs} from '../../../../components/Tabs/Tabs';
import {TabContent} from '../../../../components/TabContent/TabContent';

import {SvgDropdownIndicator} from '../../../../components/Icons/SvgDropdownIndicator';

import { StyledContainer} from './styled';
import {FontFamilyProperty} from "../../../../styles/styleProperty/FontFamilyProperty";
import {FontSizeProperty} from "../../../../styles/styleProperty/FontSizeProperty";
import {LineHeightProperty} from "../../../../styles/styleProperty/LineHeightProperty";
import {color} from 'styled-system';
import {BackgroundColorProperty} from "../../../../styles/styleProperty/BackgroundColorProperty";
import {BoxShadowProperty} from "../../../../styles/styleProperty/BoxShadowProperty";
import {BorderColorProperty} from "../../../../styles/styleProperty/BorderColorProperty";

const QuestionTab = styled(Flex)`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 12px;
  justify-content: space-between;
  
  ${(props) => FontFamilyProperty({...props, fontFamily: 'bold'})};
  ${(props) => FontSizeProperty({...props, fontSize: 6})};
  ${(props) => LineHeightProperty({...props, lineHeight: 9})};
  ${(props) => color({...props, color: 'color1'})};
  ${(props) => BackgroundColorProperty({...props, backgroundColor: 'color10'})};
  ${(props) => BoxShadowProperty({...props, boxShadow: 1})};

  border-top: solid 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  ${(props) => BorderColorProperty({...props, borderColor: 'color1'})};
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
  ${(props) => FontSizeProperty({...props, fontSize: 6})};
  ${(props) => LineHeightProperty({...props, lineHeight: 9})};
  ${(props) => color({...props, color: 'color12'})};
  ${(props) => BackgroundColorProperty({...props, backgroundColor: 'color0'})};
  border: solid 1px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  ${(props) => BorderColorProperty({...props, borderColor: 'color3'})};
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
    return <StyledContainer backgroundColor="transparent">
      <Box>
        <Text fontSize={9} fontFamily={'bold'} lineHeight={11} color={'color1'} mb={6}>FAQ</Text>
        <Box mb={6}>
          {data.map(() => (
            <TabController defaultActiveTab={null} hideWhenReClicking mb="25px">
              <Tabs>
                <QuestionTab mb={3}>
                  <Text>{faker.lorem.sentence()}</Text>
                  <SvgDropdownIndicator width="20px" height="20px"/>
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
  }
}

export default HelpPage;
