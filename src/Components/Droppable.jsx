import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({id: 'grid-1'});
  const style = {color: isOver ? 'green' : 'grey'};
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export { Droppable };