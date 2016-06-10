module.exports = {
    path: 'sub/:subId',

    getChildRoutes( location, cb ) {
        require.ensure( [], ( require ) => {
            cb( null, [
                require( './routes/SubPageOne/' ),
                require( './routes/SubPageTwo/' )
            ] );
        } );
	},

    getComponent( location, cb ) {
        require.ensure( [], ( require ) => {
            cb( null, require( './container/Example' ) );
        } );
	}
};
