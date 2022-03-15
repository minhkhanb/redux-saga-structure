import React from 'react';
import styled from '@emotion/styled';
import { RadioCheckedIcon, RadioIcon } from '@src/components/Icons';
import { css } from '@emotion/react';

interface RadioProps {
  className?: string;
  label?: string;
  inputRef: React.Ref<HTMLInputElement>;
  value: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const Radio: React.FunctionComponent<RadioProps> = styled(
  ({
    className,
    value,
    label = '',
    onChange,
    inputRef,
    ...props
  }: RadioProps) => {
    console.log('value: ', value, props);
    return (
      <label className={`label flex ${className}`}>
        <input
          {...props}
          type="radio"
          value={value}
          className={`hidden border-none cursor-pointer mr-3`}
          onChange={evt => onChange && onChange(evt)}
          ref={inputRef}
        />
        {props.checked ? (
          <RadioCheckedIcon
            className="border-none cursor-pointer mr-3"
            css={css`
              width: 25px;
              height: 25px;
            `}
          />
        ) : (
          <RadioIcon
            className="border-none cursor-pointer mr-3"
            css={css`
              width: 25px;
              height: 25px;
            `}
          />
        )}
        {label}
      </label>
    );
  },
)``;

export default Radio;
