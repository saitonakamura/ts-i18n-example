import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import { LangProvider } from './i18n';

const Root: React.SFC<{}> = () => (
  <LangProvider lang="en">
    <App name="Fish" />
  </LangProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));