import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { todoReducer } from '../../todo/state/todo.slice';

export const store = configureStore({
	reducer: {
		app: () => ({}),
		todo: todoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
