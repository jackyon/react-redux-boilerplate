import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

const store = configureStore();
let createHashHistory;
let createBrowserHistory;
let history;

if ( __DEV__ ) {
    createHashHistory = require( 'history/lib/createHashHistory' );
    history = createHashHistory( {
        queryKey: true
    } );

    history = syncHistoryWithStore( useRouterHistory( createHashHistory ) (), store );
}

if ( __PRODUCTION__ ) {
    createBrowserHistory = require( 'history/lib/createBrowserHistory' );
    history = syncHistoryWithStore( useRouterHistory( createBrowserHistory ) (), store );
}

export default {
    history,
    store
};
