import styled from "styled-components";
import {Box} from "../Box/Box";

export const PreloaderWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; 
  background-color: rgba(255, 255, 255, 0.6); 
  transition: .225s all;
`;

export default PreloaderWrapper;
