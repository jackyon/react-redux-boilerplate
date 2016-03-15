import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER } from '../constants/ActionTypes.js';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    };
}

export function completeTodo(index) {
    return {
        type: COMPLETE_TODO,
        index
    };
}

export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    };
}
