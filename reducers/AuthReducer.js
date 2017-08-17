import { NAME_CHANGED, EMAIL_CHANGED } from '../actions/types';

const INITIAL_STATE = {
	name: '',
	email: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NAME_CHANGED:
			return { ...state, name: action.payload };
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		default: 
			return state;
	}
};
