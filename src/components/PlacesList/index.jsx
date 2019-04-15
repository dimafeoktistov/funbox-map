import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Search from "../Search";
import ListItem from "../ListItem";

import "./PlacesList.css";

const paperStyle = {
  marginRight: 20,
  padding: 15,
  maxHeight: "90vh",
  overflowX: "scroll",
  minWidth: 350,
  maxWidth: 350
};

const PlacesList = ({
  places,
  addPlace,
  deletePlace,
  reorderPlaces,
  ...props
}) => {
  // Небольшая функция помогающая изменить индекс списка
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const items = reorder(places, source.index, destination.index);
    reorderPlaces(items);
  };
  return (
    <Paper {...props} style={paperStyle}>
      <Search addPlace={addPlace} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {places.map((place, index) => (
                <ListItem
                  place={place}
                  key={place.id}
                  deletePlace={deletePlace}
                  index={index}
                />
              ))}
              {provided.placeholder}
              {places.length === 0 && (
                <Typography component="p">
                  Пока не добавлено ни одного маркера
                </Typography>
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

PlacesList.propTypes = {
  places: PropTypes.instanceOf(Array).isRequired,
  addPlace: PropTypes.func.isRequired,
  reorderPlaces: PropTypes.func.isRequired
};

export default PlacesList;
