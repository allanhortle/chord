import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'chord/client/store';
import routes from 'chord/client/routes';
import clientStyles from 'chord/client/sass/styles.scss';

//
// Render Town
ReactDOM.render(<div>
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
</div>, document.getElementById('chord'));
