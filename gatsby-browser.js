import React from 'react';
import { Provider } from 'react-redux';
import 'src/assets/scss/app.scss';
import store from './src/store';

export const wrapRootElement = ({ element }) => <Provider store={store}>{element}</Provider>;
