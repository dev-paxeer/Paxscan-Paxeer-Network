import type { AlertDescriptionProps } from '@chakra-ui/react';
import { Alert as ChakraAlert, Icon } from '@chakra-ui/react';
import * as React from 'react';

// Temporary fix for SVG import issue
const IndicatorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </svg>
);

import { CloseButton } from './close-button';
import { Skeleton } from './skeleton';

export interface AlertProps extends Omit<ChakraAlert.RootProps, 'title'> {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  descriptionProps?: AlertDescriptionProps;
  title?: React.ReactNode;
  icon?: React.ReactElement;
  closable?: boolean;
  onClose?: () => void;
  loading?: boolean;
  showIcon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const {
      title,
      children,
      icon,
      closable,
      onClose,
      startElement,
      endElement,
      loading,
      showIcon = false,
      descriptionProps,
      ...rest
    } = props;

    const [ isOpen, setIsOpen ] = React.useState(true);

    const defaultIcon = <Icon boxSize={ 5 }><IndicatorIcon/></Icon>;

    const iconElement = (() => {
      if (startElement !== undefined) {
        return startElement;
      }

      if (!showIcon && icon === undefined) {
        return null;
      }

      return <ChakraAlert.Indicator>{ icon || defaultIcon }</ChakraAlert.Indicator>;
    })();

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
      onClose?.();
    }, [ onClose ]);

    if (closable && !isOpen) {
      return null;
    }

    return (
      <Skeleton loading={ loading } asChild>
        <ChakraAlert.Root ref={ ref } { ...rest }>
          { iconElement }
          { children ? (
            <ChakraAlert.Content>
              { title && <ChakraAlert.Title>{ title }</ChakraAlert.Title> }
              <ChakraAlert.Description display="inline-flex" flexWrap="wrap" { ...descriptionProps }>{ children }</ChakraAlert.Description>
            </ChakraAlert.Content>
          ) : (
            <ChakraAlert.Title flex="1">{ title }</ChakraAlert.Title>
          ) }
          { endElement }
          { closable && (
            <CloseButton
              pos="relative"
              m={ 0.5 }
              alignSelf="flex-start"
              onClick={ handleClose }
            />
          ) }
        </ChakraAlert.Root>
      </Skeleton>
    );
  },
);
