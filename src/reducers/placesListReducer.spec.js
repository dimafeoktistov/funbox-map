import { placesListReducer } from "./placesListReducer";
import * as types from "../actions/placesListActions";

describe("редьюсер списка мест", () => {
  it("возвращает изначальное состояние", () => {
    expect(placesListReducer(undefined, {})).toEqual({
      placesList: []
    });
  });

  it("добавляет место к массиву", () => {
    expect(
      placesListReducer(
        { placesList: [] },
        {
          type: types.SAVE_PLACE,
          payload: { id: 1, name: "Имя", placemark: "Точка" }
        }
      )
    ).toEqual({ placesList: [{ id: 1, name: "Имя", placemark: "Точка" }] });
  });

  it("удаляет место из массива", () => {
    expect(
      placesListReducer(
        { placesList: [{ id: 1, name: "Имя", coords: "Точка" }] },
        {
          type: types.DELETE_PLACE,
          payload: { id: 1, name: "Имя", coords: "Точка" }
        }
      )
    ).toEqual({ placesList: [] });
  });

  it("не удаляет место с другим id из массива", () => {
    expect(
      placesListReducer(
        { placesList: [{ id: 1, name: "Имя", coords: "Точка" }] },
        {
          type: types.UPDATE_PLACE,
          payload: { id: 2, name: "xcz", coords: "sad" }
        }
      )
    ).toEqual({ placesList: [{ id: 1, name: "Имя", coords: "Точка" }] });
  });

  it("меняет массив на массив из действия", () => {
    expect(
      placesListReducer(
        { placesList: [1, 2, 3] },
        {
          type: types.REORDER_PLACES,
          payload: [3, 1, 2]
        }
      )
    ).toEqual({ placesList: [3, 1, 2] });
  });
});
