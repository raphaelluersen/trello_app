import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useBoardStore } from '@/store/BoardStore';
import { Todo, TypedColumn } from '@/typings';
import { useModalStore } from '@/store/ModalStore';

type ColumnProps = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
  // columns;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: 'ToDo',
  inprogress: 'In Progress',
  done: 'Done',
};

function Column({ id, todos, index }: ColumnProps) {
  const [searchString, setNewTaskType ] = useBoardStore((state) => [state.searchString,
  state.setNewTaskType
]);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    setNewTaskType(id);

    openModal();


  };


  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className='p-3'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {/* Render droppable todos in the column */}
          <Droppable droppableId={index.toString()} type='card'>
            {(provided, snapshot) => (
              <div
                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                <h2 className='flex justify-between p-2 text-xl font-bold'>
                  {idToColumnText[id]}
                  <span className='px-2 py-1 text-sm font-normal text-gray-500 bg-gray-200 rounded-full'>
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className='space-y-2'>
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}>
                        {(provided) => (
                          <TodoCard
                            id={id}
                            todo={todo}
                            index={index}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={
                              provided.dragHandleProps
                            }></TodoCard>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className='flex items-end justify-end p-2'>
                    <button
                      onClick={handleAddTodo}
                      className='text-green-500 hover:text-green-600'
                      >
                      <PlusCircleIcon className='h-10 2-10' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
