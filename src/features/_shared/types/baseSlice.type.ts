import { TSliceStatus } from './sliceStatus.type';

export interface IBaseSlice {
	status_READ: TSliceStatus;
	status_CREATE: TSliceStatus;
	status_DELETE: TSliceStatus;
	status_UPDATE: TSliceStatus;
	message: string;
}
