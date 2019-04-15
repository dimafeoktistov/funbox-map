import * as actions from "./placesListActions";

describe("Places list action creators", () => {
  it("создаёт action ADD_PLACE", () => {
    const expectedAction = { type: "app/ADD_PLACE", payload: "Место" };
    expect(actions.addPlace("Место")).toEqual(expectedAction);
  });

  it("создаёт action DELETE_PLACE", () => {
    const expectedAction = { type: "app/DELETE_PLACE", payload: "Место" };
    expect(actions.deletePlace("Место")).toEqual(expectedAction);
  });

  it("создаёт action SAVE_PLACE", () => {
    const expectedAction = { type: "app/SAVE_PLACE", payload: "Место" };
    expect(actions.savePlace("Место")).toEqual(expectedAction);
  });

  it("создаёт action UPDATE_PLACE", () => {
    const expectedAction = { type: "app/UPDATE_PLACE", payload: "Место" };
    expect(actions.updatePlace("Место")).toEqual(expectedAction);
  });

  it("создаёт action REORDER_PLACES", () => {
    const expectedAction = { type: "app/REORDER_PLACES", payload: [] };
    expect(actions.reorderPlaces([])).toEqual(expectedAction);
  });
});
