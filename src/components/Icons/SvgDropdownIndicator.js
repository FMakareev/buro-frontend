import React from 'react';

export const SvgDropdownIndicator = ({ width, height }) => {
  const widthCustom = width || '1em';
  const heightCustom = height || '1em';

  return (
    <svg
      width={widthCustom}
      height={heightCustom}
      viewBox="0 0 32 32"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.94652 14.8535C8.75117 14.6582 8.75117 14.3418 8.94652 14.1465C9.14181 13.9512 9.45821 13.9512 9.65351 14.1465L16.3 20.7929L22.9465 14.1465C23.1418 13.9512 23.4582 13.9512 23.6535 14.1465C23.7511 14.2441 23.8 14.3721 23.8 14.5C23.8 14.6279 23.7511 14.7558 23.6535 14.8535L16.6535 21.8535C16.4582 22.0488 16.1418 22.0488 15.9465 21.8535L8.94652 14.8535Z"
        fill="inherit"
      />
      <path
        d="M16 32C24.8365 32 32 24.8365 32 16C32 7.16345 24.8365 0 16 0C7.1634 0 0 7.16345 0 16C0 24.8366 7.1634 32 16 32ZM16 31C7.72895 31 1 24.271 1 16C1 7.729 7.72895 1 16 1C24.271 1 31 7.729 31 16C31 24.271 24.271 31 16 31Z"
        fill="inherit"
      />
    </svg>
  );
};
export default SvgDropdownIndicator;
