import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoCard } from '../../features/todo/component/TodoCard/TodoCard';
import { thunkTodoRead } from '../../features/todo/state/todo.action';
import { useComponentDidMount } from '../../features/_shared/helper/useComponentDidMount/useComponentDidMount';
import { useStoreDispatch } from '../../features/_shared/hook/useStoreDispatch/useStoreDispatch';
import { useStoreSelector } from '../../features/_shared/hook/useStoreSelector/useStoreSelector';

export const TodoDetailPage: React.FC<any> = () => {
	const { id } = useParams();
	const dispatch = useStoreDispatch();
	const [selectedTodo, setSelectedTodo] = useState<any>({});
	const todoStore = useStoreSelector((state) => state.todo);
	const navigate = useNavigate();

	useComponentDidMount(() => {
		if (todoStore.data.filter((ctx: any) => ctx.id === parseInt(id as any))) {
			dispatch(thunkTodoRead({}));
		}
	});

	useEffect(() => {
		setSelectedTodo(
			todoStore.data.filter((ctx: any) => ctx.id === parseInt(id as any))[0]
		);
		if (todoStore.status_READ === 'FAILED') navigate({ pathname: '/404' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, todoStore]);

	return (
		<React.Fragment>
			<div className="container">
				<div>Todo Detail</div>
				<TodoCard title={selectedTodo?.title} />
			</div>
		</React.Fragment>
	);
};
