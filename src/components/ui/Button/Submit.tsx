/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import React, { FunctionComponent } from 'react';
import Button from '.';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  submitting: boolean;
  dirty?: boolean;
  dirtyText?: string;
  cleanText?: string;
  hideOnClean?: boolean;
  formId?: string;
  button?: React.FC;
}

const Submit: FunctionComponent<ButtonProps> = ({
  cleanText,
  dirtyText,
  hideOnClean,
  submitting,
  dirty,
  disabled,
  formId,
  button = Button.BlueRounded,
  ...props
}) => {
  const cleanTxt = cleanText || props.children || 'Close';
  const dirtyTxt = dirtyText || props.children || 'Save';

  let holdSpace = dirtyTxt;
  if (
    ((cleanTxt as string)?.length ?? 0) > ((dirtyTxt as string)?.length ?? 0)
  ) {
    holdSpace = cleanTxt;
  }

  const Btn = button as any;

  return (
    <Btn
      {...props}
      css={css`
        min-width: 8rem;
        whitespace-no-wrap;
        padding-right: 1rem;
        padding-left: 1rem;
        visibility: ${hideOnClean && !dirty && !submitting ? 'hidden' : ''}
        & div {
          top: -1px;
          position: relative;
        }
        &:disabled {
          cursor: auto;
        }
      `}
      className={`duration-200 transition-all flex-col relative ${props.className}`}
      type="submit"
      form={formId}
      disabled={disabled || submitting}
    >
      <>
        <div
          className={`inline-flex m-auto ${
            !submitting && !dirty ? '' : 'hidden'
          }`}
          css={css`
            position: relative;
            height: 0;
          `}
        >
          {cleanTxt}
        </div>
        <div
          className={`inline-flex m-auto ${
            !submitting && dirty ? '' : 'hidden'
          }`}
          css={css`
            position: relative;
            height: 0;
          `}
        >
          {dirtyTxt}
        </div>
        <div className="inline-flex invisible">{holdSpace}</div>
      </>
    </Btn>
  );
};

export default Submit;
