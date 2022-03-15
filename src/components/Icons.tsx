/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as Radio } from '@src/assets/images/radio.svg';
import { ReactComponent as RadioChecked } from '@src/assets/images/radio-checked.svg';

const IconProps = (props: any): string => `
  color: inherit;
  ${props.spin ? 'animation: icon-loading 2s linear infinite;' : ''}
`;

const icon = (c: any, zoom?: number, css?: SerializedStyles) => styled(c)`
  height: 1rem;
  ${zoom ? `transform : scale(${zoom});` : ''}
  ${props => IconProps(props)}
    ${css}
`;
export const RadioIcon = icon(Radio, 1);
export const RadioCheckedIcon = icon(RadioChecked, 1);
