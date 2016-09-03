import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppHandler from 'chord/client/components/AppHandler';
import ErrorHandler from 'chord/client/components/ErrorHandler';
import MainPage from 'chord/client/components/MainPage';
import OtherPage from 'chord/client/components/OtherPage';

var routes = (
    <Route component={AppHandler} path="/">
        <IndexRoute component={MainPage} />
        <Route path="other" component={OtherPage} />
        <Route path="*" component={ErrorHandler}/>
    </Route>
);

module.exports = routes;
