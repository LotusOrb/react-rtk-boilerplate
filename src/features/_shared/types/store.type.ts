import { Action, ThunkAction } from '@reduxjs/toolkit';
import { store } from '../store/store';

export type TStoreDispatch = typeof store.dispatch;
export type TStoreState = ReturnType<typeof store.getState>;
export type TStoreThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	TStoreState,
	unknown,
	Action<string>
>;
