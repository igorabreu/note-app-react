import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import NoteTaking from './NoteTaking';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NoteTaking />, document.getElementById('root'));
registerServiceWorker();
