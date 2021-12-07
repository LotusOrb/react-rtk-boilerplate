import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useStoreSelector } from '../../../_shared/hook/useStoreSelector/useStoreSelector';
import { TodoCard } from '../../component/TodoCard/TodoCard';

interface ITodoListContainerProps {}

export const TodoListContainer: React.FC<ITodoListContainerProps> = (param) => {
	const todoStore = useStoreSelector((store) => store.todo);
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<div>
				{todoStore.data?.map((val: any, index: any) => (
					<TodoCard
						key={index}
						id={val.id}
						title={val.title}
						body={val.body}
						onClick={(id) => navigate({ pathname: '/todo/' + id })}
					/>
				))}
			</div>
		</React.Fragment>
	);
};
