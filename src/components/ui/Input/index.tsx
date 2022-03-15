import { withProperties } from 'src/utils/type';
import React from 'react';
import { css } from '@emotion/react';
import Radio from 'src/components/ui/Input/Radio';

interface InputProps {
  inputRef: React.Ref<HTMLInputElement>;
  value: string;
  className?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  inputRef,
  value,
  className,
  ...props
}) => {
  return (
    <input
      className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
      css={css`
        &::placeholder {
          opacity: 1;
        }
        &:disabled {
          opacity: 0.4;
        }
      `}
      ref={inputRef}
      onChange={evt => props.onChange && props.onChange(evt)}
      value={value ?? ''}
      {...props}
    />
  );
};

export default withProperties(Input, {
  Radio,
});
