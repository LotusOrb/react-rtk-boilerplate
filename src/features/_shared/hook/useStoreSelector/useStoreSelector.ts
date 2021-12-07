import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TStoreState } from '../../types/store.type';

export const useStoreSelector: TypedUseSelectorHook<TStoreState> = useSelector;
