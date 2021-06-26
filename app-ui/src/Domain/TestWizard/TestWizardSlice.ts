import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SelectedAnswer } from "./Types";

interface TestState {
  selectedAnswers: SelectedAnswer;
  activeQuestion: number;
}

const initialState: TestState = { selectedAnswers: {}, activeQuestion: 0 };

const testWizardSlice = createSlice({
  name: "testWizard",
  initialState,
  reducers: {
    selectAnswer(
      state,
      action: PayloadAction<{ questionId: string; answerId: string }>
    ) {
      const { questionId, answerId } = action.payload;
      state.selectedAnswers[questionId] = answerId;
    },
    goToNextQuestion(state) {
      state.activeQuestion = state.activeQuestion + 1;
    },
    goToPreviousQuestion(state) {
      state.activeQuestion = state.activeQuestion - 1;
    },
    resetTest(state) {
      state.selectedAnswers = {};
      state.activeQuestion = 0;
    },
  },
});

export const {
  selectAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  resetTest,
} = testWizardSlice.actions;

export default testWizardSlice.reducer;
