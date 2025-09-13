import { chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } : {
    base: 'block',
    lg: isCollapsed === false ? 'block' : 'none',
    xl: isCollapsed ? 'none' : 'block',
  };

  return (
    <IconSvg
      name={ isSmall ? 'networks/icon-placeholder' : 'networks/logo-placeholder' }
      width={ isSmall ? '30px' : '120px' }
      height="100%"
      color={{ base: 'blue.600', _dark: 'white' }}
      display={ display }
      aria-label={ isSmall ? 'Network icon placeholder' : 'Network logo placeholder' }
    />
  );
};

const INVERT_FILTER = 'brightness(0) invert(1)';

const NetworkLogo = ({ isCollapsed, onClick, className }: Props) => {

  const logoSrc = useColorModeValue(
    'https://storage.googleapis.com/conduit-prd-apps-web-cdn/paxeer-network-djjz47ii4b-946cbaf8-612a-4bb1-a61d-79a82248b113.png',
    'https://storage.googleapis.com/conduit-prd-apps-web-cdn/paxeer-network-djjz47ii4b-1ba87699-767c-4487-97da-75be29e7554a.png'
  );
  const iconSrc = useColorModeValue(
    'https://storage.googleapis.com/conduit-prd-apps-web-cdn/paxeer-network-djjz47ii4b-b9823b7f-e867-44ff-8ff1-631e8d36f505.png',
    'https://storage.googleapis.com/conduit-prd-apps-web-cdn/paxeer-network-djjz47ii4b-a92563a6-e1fe-427b-8058-24b900ec5723.png'
  );

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      width={{ base: '120px', lg: isCollapsed === false ? '120px' : '30px', xl: isCollapsed ? '30px' : '120px' }}
      height={{ base: '24px', lg: isCollapsed === false ? '24px' : '30px', xl: isCollapsed ? '30px' : '24px' }}
      display="inline-flex"
      overflow="hidden"
      onClick={ onClick }
      flexShrink={ 0 }
      aria-label="Link to main page"
    >
      { /* big logo */ }
      <Image
        w="100%"
        h="100%"
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed }/> }
        display={{ base: 'block', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
        filter={undefined}
        objectFit="contain"
        objectPosition="left"
      />
      { /* small logo */ }
      <Image
        w="100%"
        h="100%"
        src={ iconSrc }
        alt={ `${ config.chain.name } network icon` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed } isSmall/> }
        display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}
        filter={undefined}
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
