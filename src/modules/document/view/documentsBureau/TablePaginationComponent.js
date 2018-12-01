import React, {Component} from 'react';
import classnames from 'classnames';
import {ButtonWithImage} from "../../../../components/ButtonWithImage/ButtonWithImage";
import SvgArrowLeft from "../../../../components/Icons/SvgArrowLeft";
import {SvgArrowRight} from "../../../../components/Icons/SvgArrowRight";
import {Text} from "../../../../components/Text/Text";
import {Flex} from "../../../../components/Flex/Flex";
import {Box} from "../../../../components/Box/Box";


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
      className,
      PreviousComponent = defaultButton,
      NextComponent = defaultButton,
    } = this.props;

    return (
      <Flex p={3} flexDirection={['column', 'column', 'row', 'row', 'row']}>
        <Box width={'240px'}>
          <PreviousComponent
            iconLeft={<Text fontSize={13} lineHeight={0} fill={'inherit'}><SvgArrowLeft/></Text>}
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1)
            }}
            disabled={!canPrevious}
          >
            {this.props.previousText}
          </PreviousComponent>
        </Box>
        <Flex width={'100%'} className="-center">
          <Box width={'50%'}>
            <Flex >
              <Text fontSize={5} lineHeight={7} fontFamily={'medium'} color={'color1'}>
                {this.props.pageText}{' '}
              </Text>

              <Box>
                {showPageJump ? (
                  <div className="-pageJump">
                    <input
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
                  </div>
                ) : (
                  <span className="-currentPage">{page + 1}</span>
                )}
              </Box>
              {' '}
              <Text fontSize={5} lineHeight={7} fontFamily={'medium'} color={'color1'}>
                {this.props.ofText} {pages || 1}
              </Text>
            </Flex>
          </Box>
          <Box width={'50%'}>
            {showPageSizeOptions && (
              <span className="select-wrap -pageSizeOptions">
              <select onChange={e => onPageSizeChange(Number(e.target.value))} value={pageSize}>
                {pageSizeOptions.map((option, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option key={i} value={option}>
                    {option} {this.props.rowsText}
                  </option>
                ))}
              </select>
            </span>
            )}
          </Box>


        </Flex>
        <Box width={'240px'}>
          <NextComponent
            iconRight={<Text fontSize={13} lineHeight={0} fill={'inherit'}><SvgArrowRight/></Text>}
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1)
            }}
            disabled={!canNext}
          >
            {this.props.nextText}
          </NextComponent>
        </Box>
      </Flex>
    )
  }
}


export default TablePaginationComponent;
