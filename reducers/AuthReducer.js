import { NAME_CHANGED } from '../actions/types';

const INITIAL_STATE = {
	name: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NAME_CHANGED:
			return { ...state, name: action.payload };
		default: 
			return state;
	}
};
