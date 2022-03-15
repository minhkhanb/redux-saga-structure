import React, { FunctionComponent, MouseEventHandler } from 'react';
import { css } from '@emotion/react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  as?: React.FC | string;
  onClick?: MouseEventHandler;
}

const Button: FunctionComponent<ButtonProps> = ({
  as = 'button',
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Btn = as as any;

  return (
    <Btn
      {...props}
      type={props.type || 'button'}
      css={css`
        :hover {
          opacity: 0.9;
        }
        :disabled {
          opacity: 0.7;
        }
      `}
      className={`inline-flex flex-row items-center justify-center cursor-pointer appearence-none outline-none whitespace-no-wrap ${props.className}`}
    >
      {props.children}
    </Btn>
  );
};

export const BlueRounded: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => (
  <Button
    {...props}
    className={`hover:shadow-md border-2 border-link text-link ${className}`}
    css={css`
      border-radius: 9999px;
      padding: 0.5rem 1rem;
      min-height: 2.4rem;
      font-weight: 400;
    `}
  >
    {children}
  </Button>
);

export const WhiteRounded: React.FC<ButtonProps> = ({
  className,
  ...props
}) => (
  <BlueRounded
    {...props}
    className={`border-2 border-color-whiteButton text-color-whiteButton ${className}`}
  />
);

export const Primary: React.FC<ButtonProps> = ({ children, ...props }) => (
  <BlueRounded {...props}>{children}</BlueRounded>
);

export default Button;
