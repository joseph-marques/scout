import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles/tailwind.css';

require('typeface-fredoka-one');
require('typeface-open-sans');
require('typeface-crimson-text');
require('typeface-work-sans');

ReactDOM.render(<App />, document.getElementById('root'));
