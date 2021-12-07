import { useEffect } from 'react';

let mounted = false;

export const useComponentDidMount = (callback?: () => void) => {
	useEffect(() => {
		if (typeof callback === 'function' && !mounted) {
			callback();
		}
	}, []);
};
