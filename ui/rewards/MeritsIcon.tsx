import { Icon, chakra } from '@chakra-ui/react';
import React from 'react';

// This icon doesn't work properly when it is in the sprite
// Probably because of the gradient
// eslint-disable-next-line no-restricted-imports
// Temporary fix for SVG import issue
const MeritsIconColored = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

type Props = {
  className?: string;
};

const MeritsIcon = ({ className }: Props) => {
  return (
    <Icon className={ className } filter={{ _light: 'drop-shadow(0px 4px 2px rgba(141, 179, 204, 0.25))', _dark: 'none' }}>
      <MeritsIconColored/>
    </Icon>
  );
};

export default chakra(MeritsIcon);
