import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  marginBottom: 10
};

const ListItem = ({ place, deletePlace, index }) => {
  const handleDelete = () => deletePlace(place);

  return (
    <Draggable key={place.id} draggableId={place.id} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper style={listItemStyle}>
            <Typography variant="p" style={{ maxWidth: "75%" }}>
              {place.name}
            </Typography>
            <Button
              type="button"
              style={{ width: "25%" }}
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Удалить
            </Button>
          </Paper>
        </li>
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
