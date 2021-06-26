import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { testsApi } from "Domain/TestWizard/TestWizardService";
import testWizardSlice from "Domain/TestWizard/TestWizardSlice";

export const rootReducer = {
  [testsApi.reducerPath]: testsApi.reducer,
  testWizard: testWizardSlice,
};

export const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(testsApi.middleware);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
