import { createSlice } from '@reduxjs/toolkit';
import { baseSlice } from '../../_shared/store/baseSlice';
import { ITodoState } from '../types/todoState.type';
import { todoActionBuilder, todoActionThunkBuilder } from './todo.action';

const initialState: ITodoState = Object.assign({ data: [] }, baseSlice);

const todoSlice = createSlice({
	name: 'todo',
	initialState: initialState,
	reducers: todoActionBuilder,
	extraReducers: todoActionThunkBuilder,
});

export const todoReducer = todoSlice.reducer;
