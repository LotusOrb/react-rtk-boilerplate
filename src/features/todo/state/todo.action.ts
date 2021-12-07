import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import BaseApiService from '../../_shared/service/BaseApiService';
import { ITodoState } from '../types/todoState.type';

const service = new BaseApiService();

export const todoActionBuilder = {
	resetTodoState: (state: WritableDraft<ITodoState>) => {
		state = {
			status_CREATE: 'IDLE',
			status_READ: 'IDLE',
			status_UPDATE: 'IDLE',
			status_DELETE: 'IDLE',
			message: '',
		};
	},
};

export const thunkTodoCreate = createAsyncThunk(
	'todo/thunk/create',
	async (payload: any, thunk) => await service.basePOST('todos')
);

export const thunkTodoRead = createAsyncThunk(
	'todo/thunk/read',
	async (payload: any, thunk) => await service.baseGET('todos')
);

export const thunkTodoUpdate = createAsyncThunk(
	'todo/thunk/update',
	async (payload: any, thunk) => await service.basePUT('todos')
);

export const thunkTodoDelete = createAsyncThunk(
	'todo/thunk/delete',
	async (payload: any, thunk) => await service.baseDELETE('todos')
);

export const todoActionThunkBuilder = (
	builder: ActionReducerMapBuilder<ITodoState>
) =>
	builder
		.addCase(thunkTodoCreate.pending, (state) => {
			state.message = '';
			state.status_CREATE = 'LOADING';
		})
		.addCase(thunkTodoCreate.fulfilled, (state, { payload }) => {
			state.message = state.message;
			if (!payload.isFailed) {
				state.status_CREATE = 'SUCCESS';
				state.data = payload.original;
			} else {
				state.status_CREATE = 'FAILED';
			}
		})
		.addCase(thunkTodoRead.pending, (state) => {
			state.message = '';
			state.status_READ = 'LOADING';
		})
		.addCase(thunkTodoRead.fulfilled, (state, { payload }) => {
			state.message = state.message;
			if (!payload.isFailed) {
				state.status_READ = 'SUCCESS';
				state.data = payload.original?.data;
			} else {
				state.status_READ = 'FAILED';
			}
		})
		.addCase(thunkTodoUpdate.pending, (state) => {
			state.message = '';
			state.status_UPDATE = 'LOADING';
		})
		.addCase(thunkTodoUpdate.fulfilled, (state, { payload }) => {
			state.message = state.message;
			if (!payload.isFailed) {
				state.status_UPDATE = 'SUCCESS';
			} else {
				state.status_UPDATE = 'FAILED';
			}
		})
		.addCase(thunkTodoDelete.pending, (state) => {
			state.message = '';
			state.status_DELETE = 'LOADING';
		})
		.addCase(thunkTodoDelete.fulfilled, (state, { payload }) => {
			state.message = state.message;
			if (!payload.isFailed) {
				state.status_DELETE = 'SUCCESS';
			} else {
				state.status_DELETE = 'FAILED';
			}
		});
