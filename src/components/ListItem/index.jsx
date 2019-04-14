import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({ place, deletePlace, index }) => {
  const handleDelete = () => deletePlace(place);

  return (
    <Draggable key={place.id} draggableId={place.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <li>{place.name}</li>
          <button type="button" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      )}
    </Draggable>
  );
};

ListItem.propTypes = {
  place: PropTypes.instanceOf(Object).isRequired,
  deletePlace: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default ListItem;
