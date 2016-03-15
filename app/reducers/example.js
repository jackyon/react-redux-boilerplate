import { ADD_TODO, COMPLETE_TODO } from '../constants/ActionTypes.js';

const initialState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
];

export default function example(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];

        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];

        default:
            return state;
    }
}
