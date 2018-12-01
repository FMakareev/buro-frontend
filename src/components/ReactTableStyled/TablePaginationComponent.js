import React, {Component} from 'react';
import {ButtonWithImage} from "../ButtonWithImage/ButtonWithImage";
import SvgArrowLeft from "../Icons/SvgArrowLeft";
import {SvgArrowRight} from "../Icons/SvgArrowRight";
import {Text} from "../Text/Text";
import {Flex} from "../Flex/Flex";
import {Box} from "../Box/Box";
import styled from "styled-components";


const InputStyled = styled.input`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid rgba(162, 162, 162, 0.2);
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.color1};
  text-align: center;
`;

const SelectStyled = styled.select`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid rgba(162, 162, 162, 0.2);
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.color1};
  text-align: center;
`;
const WrapperStyled = styled(Flex)`
  border-top: 1px solid rgba(162, 162, 162, 0.2);
`;

const defaultButton = props => (
  <ButtonWithImage size={'large'} variant={'secondary'} type="button" {...props}>
    {props.children}
  </ButtonWithImage>
);

export class TablePaginationComponent extends Component {
  constructor(props) {
    super(props);

    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);

    this.state = {
      page: props.page,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({page: nextProps.page})
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1)
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({page});
    if (this.props.page !== page) {
      this.props.onPageChange(page)
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault()
    }
    const page = this.state.page;
    this.changePage(page === '' ? this.props.page : page)
  }

  render() {
    const {
      // Computed
      pages,
      // Props
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      PreviousComponent = defaultButton,
      NextComponent = defaultButton,
    } = this.props;
    console.log(this.props);
    return (
      <WrapperStyled flexDirection={['column', 'column', 'row', 'row', 'row']}>
        <Box  p={3} width={'256px'}>
          <PreviousComponent
            iconLeft={<Text fontSize={13} lineHeight={0} fill={'inherit'}><SvgArrowLeft/></Text>}
            onClick={() => {
              if (!canPrevious) return;
              console.log('onClick; prev');

              this.changePage(page - 1)
            }}
            disabled={!canPrevious}
          >
            {this.props.previousText}
          </PreviousComponent>
        </Box>
        <Flex  width={'100%'} className="-center">
          <Flex
            p={3}
            style={{
              borderRight: '1px solid rgba(162, 162, 162, 0.2)'
            }}
            width={'50%'}
            justifyContent={'space-around'}
            alignItems={'center'}
          >
            <Text fontSize={6} lineHeight={9} fontFamily={'medium'} color={'color1'}>
              {this.props.pageText}
            </Text>

            <Box px={3}>
              {showPageJump ? (
                <InputStyled
                  type={this.state.page === '' ? 'text' : 'number'}
                  onChange={e => {
                    const val = e.target.value;
                    const page = val - 1;
                    if (val === '') {
                      return this.setState({page: val})
                    }
                    this.setState({page: this.getSafePage(page)})
                  }}
                  value={this.state.page === '' ? '' : this.state.page + 1}
                  onBlur={this.applyPage}
                  onKeyPress={e => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage()
                    }
                  }}
                />
              ) : (
                <Text fontSize={6} lineHeight={7} fontFamily={'medium'} color={'color1'}>
                  {page + 1}
                </Text>
              )}
            </Box>
            <Text fontSize={6} lineHeight={7} fontFamily={'medium'} color={'color1'}>
              {this.props.ofText} {pages || 1}
            </Text>
          </Flex>

          <Flex
            p={3}
            width={'50%'}
            justifyContent={'space-around'}
            alignItems={'center'}
          >            {showPageSizeOptions && (
            <span className="select-wrap -pageSizeOptions">
              <SelectStyled onChange={e => onPageSizeChange(Number(e.target.value))} value={pageSize}>
                {pageSizeOptions.map((option, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={i} value={option}>
                    {option} {this.props.rowsText}
                  </option>
                ))}
              </SelectStyled>
            </span>
          )}
          </Flex>


        </Flex>
        <Box p={3} width={'256px'}>
          <NextComponent
            iconRight={<Text fontSize={13} lineHeight={0} fill={'inherit'}><SvgArrowRight/></Text>}
            onClick={() => {
              console.log('onClick; next');
              if (!canNext) return;
              this.changePage(page + 1)
            }}
            disabled={!canNext}
          >
            {this.props.nextText}
          </NextComponent>
        </Box>
      </WrapperStyled>
    )
  }
}


export default TablePaginationComponent;
