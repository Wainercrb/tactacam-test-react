import React from "react";
import renderer from "react-test-renderer";

import ColorSelector from "../components/ColorSelector";

describe("Color Selector Component", () => {
  it("Should render 2 children's", () => {
    const app = renderer.create(<ColorSelector />).toJSON();
    expect(app.children.length).toBe(2);
  });

  it("Should return view type", () => {
    const app = renderer.create(<ColorSelector />).toJSON();
    expect(app.type).toBe("View");
  });
});
