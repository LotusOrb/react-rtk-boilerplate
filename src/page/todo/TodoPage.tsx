import React, { useEffect } from 'react';
import { TodoListContainer } from '../../features/todo/container/TodoListContainer/TodoListContainer';
import { thunkTodoRead } from '../../features/todo/state/todo.action';
import { useStoreDispatch } from '../../features/_shared/hook/useStoreDispatch/useStoreDispatch';

export const TodoPage: React.FC<any> = () => {
	const dispatch = useStoreDispatch();
	useEffect(() => {
		dispatch(thunkTodoRead({}));
	});
	return (
		<React.Fragment>
			<div className="container">
				<TodoListContainer />
			</div>
		</React.Fragment>
	);
};
