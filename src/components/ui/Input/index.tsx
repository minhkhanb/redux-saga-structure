import { withProperties } from 'src/utils/type';
import React from 'react';
import { css } from '@emotion/react';
import Radio from 'src/components/ui/Input/Radio';

interface InputProps {
  inputRef: React.Ref<HTMLInputElement>;
  value: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  inputRef,
  value,
  ...props
}) => (
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
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

export default withProperties(Input, {
  Radio,
});
