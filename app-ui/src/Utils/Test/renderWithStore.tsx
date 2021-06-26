/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ReactNode } from "react";

import { rootReducer, middleware } from "Domain/store";

const renderWithStore = (
  ui: ReactNode,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      middleware,
      preloadedState: initialState,
    }),
  }: any = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

export default renderWithStore;
