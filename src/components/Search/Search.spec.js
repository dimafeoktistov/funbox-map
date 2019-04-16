import React from "react";
import Search from "./index";
import renderer from "react-test-renderer";

test("рендерится без краша", () => {
  const component = renderer.create(<Search addPlace={() => {}} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
