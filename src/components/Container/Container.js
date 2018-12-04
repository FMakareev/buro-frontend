import styled from 'styled-components';
import { Box } from '../Box/Box';
import { MaxWidthProperty } from '../../styles/styleProperty/MaxWidthProperty';
import BackgroundColorProperty from '../../styles/styleProperty/BackgroundColorProperty';

export const Container = styled(Box)`
  ${MaxWidthProperty};
  ${BackgroundColorProperty};
`;

Container.defaultProps = {
  mt: 0,
  mb: 0,
  ml: 'auto',
  mr: 'auto',
  maxWidth: '1024px',
  backgroundColor: 'color0',
};

export default Container;
