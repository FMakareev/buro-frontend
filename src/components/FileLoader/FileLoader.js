import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { color } from 'styled-system';
import Text from '../Text/Text';
import SvgDragNDrop from '../Icons/SvgDragNDrop';
import { PreloaderWrapper } from '../PreloaderWrapper/PreloaderWrapper';
import { SpeedingWheel } from '../SmallPreloader/SmallPreloader';
import { BorderColorProperty } from '../../styles/styleProperty/BorderColorProperty';

const WrapperStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const DropzoneStyled = styled(Dropzone)`
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  width: 650px;
  height: 396px;
  padding: 3%;
  box-shadow: 4px 8px 16px rgba(28, 65, 84, 0.08);
  ${props => {
    if (props.reject) {
      return color({ ...props, color: 'color9' });
    }
    return color({ ...props, color: 'color1' });
  }};
  border: 0.5px solid;
  ${(reject, props) => {
    if (reject) {
      return BorderColorProperty({ ...props, borderColor: 'color9' });
    }
    return BorderColorProperty({ ...props, borderColor: 'color14' });
  }};
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: block;
    border-radius: 4px;
    max-width: 590px;
    width: 94%;
    min-height: 336px;
    border: 2px dashed;
    ${(reject, props) => {
      if (reject) {
        return BorderColorProperty({ ...props, borderColor: 'color9' });
      }
      return BorderColorProperty({ ...props, borderColor: 'color1' });
    }};
  }
`;

const Preloader = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 2px solid #093971;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: cssload-spin 500ms infinite linear;
  -o-animation: cssload-spin 500ms infinite linear;
  -ms-animation: cssload-spin 500ms infinite linear;
  -webkit-animation: cssload-spin 500ms infinite linear;
  -moz-animation: cssload-spin 500ms infinite linear;

  @keyframes cssload-spin {
    100% {
      transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-spin {
    100% {
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-spin {
    100% {
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-spin {
    100% {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export class FileLoader extends Component {
  static propTypes = {
    /** Показывает что в форме есть ошибка */
    reject: PropTypes.bool,
    /** Показывает загрузку */
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    multiple: false,
  };

  render() {
    const { isLoading, ...rest } = this.props;
    return (
      <DropzoneStyled {...rest}>
        <WrapperStyled>
          <Text fontSize={8} fontFamily="regular" color="inherit" mb={12}>
            Drag your file here
          </Text>
          <Text mb={12}>
            <SvgDragNDrop />
          </Text>
          <Text fontSize={6} fontFamily="regular" color="inherit">
            Files with the extension "xml" are allowed
          </Text>
        </WrapperStyled>
        {isLoading && (
          <PreloaderWrapper>
            <Text fontSize={12}>
              <SpeedingWheel />
            </Text>
          </PreloaderWrapper>
        )}
      </DropzoneStyled>
    );
  }
}

export default FileLoader;
