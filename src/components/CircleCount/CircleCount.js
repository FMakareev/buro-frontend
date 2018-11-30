import { Text } from '../Text/Text';
import styled from 'styled-components';

export const CircleCount = styled(Text)`
  position: relative;
  min-width: 20px;
  min-height: 20px;
  text-align: center;
  border-radius: 500px;
  flex-shrink: 0;
`;

CircleCount.defaultProps = {
  backgroundColor: 'color1',
  color: 'color0',
};

export default CircleCount;
