import { Box, Icon } from '@chakra-ui/react';
import React from 'react';

// This icon doesn't work properly when it is in the sprite
// Probably because of radial gradient
// eslint-disable-next-line no-restricted-imports
// Temporary fix for SVG import issue
const emptySearchResultIcon = () => (
  <svg width="144" height="104" viewBox="0 0 144 104" fill="none">
    <circle cx="72" cy="44" r="36" stroke="#E2E8F0" strokeWidth="2" fill="none"/>
    <path d="m100 72 12 12" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M72 28v32m-16-16h32" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
import { Heading } from 'toolkit/chakra/heading';

interface Props {
  text: string | React.JSX.Element;
}

const EmptySearchResult = ({ text }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt="50px"
    >
      <Icon
        as={ emptySearchResultIcon }
        w={{ base: '160px', sm: '240px' }}
        h="auto"
        mb={{ base: 4, sm: 6 }}
      />

      <Heading level="3" mb={ 2 }>
        No results
      </Heading>

      <Box fontSize={{ base: 'sm', sm: 'md' }} textAlign="center">
        { text }
      </Box>
    </Box>
  );
};

export default EmptySearchResult;
