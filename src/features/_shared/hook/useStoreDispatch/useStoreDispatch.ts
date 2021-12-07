import { useDispatch } from 'react-redux';
import { TStoreDispatch } from '../../types/store.type';

export const useStoreDispatch = () => useDispatch<TStoreDispatch>();
