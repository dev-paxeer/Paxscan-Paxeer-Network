import type { ButtonProps } from '@chakra-ui/react';
import { Icon, useRecipe } from '@chakra-ui/react';
import * as React from 'react';

// Temporary fix for SVG import issue
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
  </svg>
);

import { recipe as closeButtonRecipe } from '../theme/recipes/close-button.recipe';
import { IconButton } from './icon-button';
export interface CloseButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'plain';
  size?: 'md';
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const recipe = useRecipe({ recipe: closeButtonRecipe });
  const [ recipeProps, restProps ] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  return (
    <IconButton aria-label="Close" ref={ ref } css={ styles } { ...restProps }>
      { props.children ?? <Icon boxSize={ 5 }><CloseIcon/></Icon> }
    </IconButton>
  );
});
