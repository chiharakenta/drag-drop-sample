import './App.css';
import { FC, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface Item {
  id: number;
  text: string;
}

export const App: FC = () => {
  const [items, setItems] = useState<Array<Item>>([
    {
      id: 0,
      text: 'item0'
    },
    {
      id: 1,
      text: 'item1'
    },
    {
      id: 2,
      text: 'item2'
    }
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = [...items];
    const removedItems = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removedItems[0]);
    setItems(newItems);
  };

  return (
    <div className="dragDropArea">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.text} index={index}>
                  {(provided) => (
                    <div
                      className="item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
