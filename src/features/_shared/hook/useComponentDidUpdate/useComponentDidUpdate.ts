import { useEffect, useRef } from 'react';

export const useComponentDidUpdate = (
	dependency: Array<any>,
	updateFn: () => void
) => {
	const mounted = useRef();
	useEffect(() => {
		if (!mounted.current) {
			(mounted as any).current = true;
		} else {
			updateFn();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependency);
};
