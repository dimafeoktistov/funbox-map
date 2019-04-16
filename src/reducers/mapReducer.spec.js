import { mapReducer } from "./mapReducer";

describe("редьюсер карты", () => {
  it("возвращает изначальное состояние", () => {
    expect(mapReducer(undefined, {})).toEqual({
      loading: true,
      map: null,
      polyLine: null
    });
  });

  it("сохраняет карту и ломанную линию", () => {
    expect(
      mapReducer(
        { map: null, polyLine: null },
        {
          type: "app/CREATE_MAP",
          payload: { map: "Карта", polyLine: "Кривая" }
        }
      )
    ).toEqual({ map: "Карта", polyLine: "Кривая" });
  });
});
