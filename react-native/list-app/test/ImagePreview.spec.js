import React from "react";
import renderer from "react-test-renderer";

import ImagePreview from "../components/ImagePreview";

describe("ImagePreview", () => {
  it("Should render Image type", () => {
    const image = renderer.create(<ImagePreview url="" />).toJSON();
    expect(image.type).toBe("Image");
  });
});
