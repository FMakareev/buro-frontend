import styled from "styled-components";

export const WrapperMessage = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  width: 650px;
  height: 396px;    
  padding: 3%;
  box-shadow: 4px 8px 16px rgba(28, 65, 84, 0.08);
    color: ${({reject, theme}) => {
  if (reject) {
    return theme.colors.color9;
  } else {
    return theme.colors.color1;
  }
}};
  border: 0.5px solid ${({reject, theme}) => {
  if (reject) {
    return theme.colors.color9;
  } else {
    return '#D3D3D3';
  }
}};
`;

export const MessageContentStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);  
  text-align: center;  
`;
