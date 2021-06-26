import renderWithStore from "Utils/Test/renderWithStore";

import Home from ".";

describe("Home page", () => {
  test("default home page", () => {
    const { getByText } = renderWithStore(<Home />);
    expect(getByText("Get Started")).toBeInTheDocument();
  });
});
