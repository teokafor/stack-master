import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import '/src/Components/Components.css';

function GridCell(props) {
  const {isOver, setNodeRef} = useDroppable({id: props.id});
  const style = {backgroundColor: isOver ? '#dddddd' : null};
  
  return (
    <div ref={setNodeRef} style={style} id={props.id}>
        {props.children}
    </div>
  );
}

export { GridCell };