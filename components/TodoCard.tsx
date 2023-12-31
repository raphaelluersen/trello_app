'use client';
import { Todo, TypedColumn } from '@/typings';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import getUrl from '@/lib/getUrl';
import { useEffect, useState } from 'react';
import Image from 'next/image';


type TodoCardProps = {
  id: TypedColumn;
  todo: Todo;
  index: number;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  innerRef: (element: HTMLElement | null) => void;
};

function TodoCard({
  id,
  todo,
  index,
  dragHandleProps,
  draggableProps,
  innerRef,
}: TodoCardProps) {

  const deletetask = useBoardStore ((state) => state.deleteTask);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl (todo.image!);
        if (url) {
          setImageUrl(url.toString ());
        }



      }

      fetchImage();



    }


  }, [todo])

    

  return (
    <div
      className='space-y-2 bg-white rounded-md drop-shadow-md'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className='flex items-center justify-between p-5'>
        <p className=''>{todo.title}</p>
        <button onClick={() => deletetask (index, todo, id)}  className='text-red-500 hover:text-red-600'>
          <XCircleIcon className='w-8 h-8 ml-5' />
        </button>
      </div>
      {/* Add Image here... */}
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image 
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>

      )}
    </div>
  );
}

export default TodoCard;
