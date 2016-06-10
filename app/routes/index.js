export default {
    childRoutes: [ {
        path: '/',
        component: require( '../containers/App/' ),
        indexRoute: { component: require( '../containers/Home/' ) },
        childRoutes: [
            require( './Home' ),
            require( './About' )
        ]
    } ]
};
