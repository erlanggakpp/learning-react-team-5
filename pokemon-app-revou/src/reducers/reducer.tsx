// Import necessary types
import { Reducer } from "react";

// Define action types as constants
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// Define the shape of the state
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Define the initial state
const initialState: Todo[] = [];

// Define the reducer function
const todoReducer: Reducer<Todo[], TodoAction> = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        case TOGGLE_TODO:
            return state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo));
        default:
            return state;
    }
};

// Define action interfaces
interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
}

interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    payload: number; // ID of the todo to toggle
}

type TodoAction = AddTodoAction | ToggleTodoAction;

// Export the reducer function
export default todoReducer;
