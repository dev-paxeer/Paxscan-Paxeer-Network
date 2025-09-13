import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { type IconName } from 'public/icons/name';
import React from 'react';

import config from 'configs/app';
import { Skeleton } from 'toolkit/chakra/skeleton';

export const href = config.app.spriteHash ? `/icons/sprite.${ config.app.spriteHash }.svg` : '/icons/sprite.svg';

export { IconName };

export interface Props extends HTMLChakraProps<'div'> {
  name: IconName;
  isLoading?: boolean;
}

const IconSvg = React.forwardRef(
  function IconSvg({ name, isLoading = false, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) {
    // Extract size props and convert to string values for CSS
    const { w, width, h, height, ...restProps } = props;
    
    const getSize = (value: any): string => {
      if (typeof value === 'number') return `${value}px`;
      if (typeof value === 'string') return value;
      return '24px';
    };

    const widthValue = getSize(w || width);
    const heightValue = getSize(h || height);

    if (isLoading) {
      return <Skeleton loading w={widthValue} h={heightValue} ref={ref}/>;
    }

    return (
      <chakra.div 
        ref={ref}
        {...restProps}
        w={widthValue}
        h={heightValue}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24"
          style={{ display: 'block' }}
        >
          <use href={`${href}#${name}`}/>
        </svg>
      </chakra.div>
    );
  },
);

IconSvg.displayName = 'IconSvg';

export default IconSvg;
