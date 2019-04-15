import * as actions from "./mapActions";

describe("Map action creators", () => {
  it("создаёт action CREATE_MAP", () => {
    const expectedAction = { type: "app/CREATE_MAP", payload: "Карта" };
    expect(actions.createMap("Карта")).toEqual(expectedAction);
  });

  it("создаёт action INIT_MAP", () => {
    const expectedAction = { type: "app/INIT_MAP" };
    expect(actions.initMap()).toEqual(expectedAction);
  });

  it("создаёт action ADD_ROUTE", () => {
    const expectedAction = { type: "app/ADD_ROUTE", payload: "маршрут" };
    expect(actions.addRoute("маршрут")).toEqual(expectedAction);
  });

  it("создаёт action UPDATE_POLYLINE", () => {
    const expectedAction = { type: "app/UPDATE_POLYLINE" };
    expect(actions.updatePolyline()).toEqual(expectedAction);
  });
});
