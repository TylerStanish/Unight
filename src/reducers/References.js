const initialState = {
	color: '#4cd964',
	globalMarginTop: 0,
	globalMarginBottom: 0,
};

export default (state = initialState, action) => {
	switch(action.type){
		case 'setGlobalMarginTop': 
			return{
				...state,
				globalMarginTop: action.payload,
			};
		default:
			return state;
	}
};