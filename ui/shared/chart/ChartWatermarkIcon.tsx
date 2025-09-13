import type { IconProps } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line no-restricted-imports
// Temporary fix for SVG import issue
const logoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l3 3"/>
  </svg>
);

const ChartWatermarkIcon = (props: IconProps) => {
  return (
    <Icon
      { ...props }
      as={ logoIcon }
      position="absolute"
      opacity={ 0.1 }
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      viewBox="0 0 114 20"
      color={{ _light: 'link', _dark: 'white' }}
    />
  );
};

export default ChartWatermarkIcon;
