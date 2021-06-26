import { createSelector } from "@reduxjs/toolkit";
import get from "lodash.get";
import isEmpty from "lodash.isempty";

import { RootState } from "Domain/store";
import { SelectedAnswer, Test } from "Domain/TestWizard/Types";
import { testsApi } from "Domain/TestWizard/TestWizardService";

export const testWizardSelector = (state: RootState) => state.testWizard;
export const testApiFullSelector = testsApi.endpoints.getTestsAll.select();

export const testApiSelector = createSelector(
  testApiFullSelector,
  (testApiFull) => testApiFull.data as Test
);

export const questionsAmountSelector = createSelector(
  testApiSelector,
  (testData) => {
    if (testData?.questions) {
      return testData.questions.length;
    }
  }
);

export const scoresSelector = createSelector(
  testApiSelector,
  (testData) => testData.scores || []
);

export const questionsSelector = createSelector(
  testApiSelector,
  (testData) => testData.questions || []
);

export const activeQuestionSelector = createSelector(
  testWizardSelector,
  (testWizard) => testWizard.activeQuestion
);

export const selectedAnswersSelector = createSelector(
  testWizardSelector,
  (testWizard): SelectedAnswer => testWizard.selectedAnswers
);

export const wasNoneAnsweredSelector = createSelector(
  testWizardSelector,
  (testWizard) => isEmpty(testWizard.selectedAnswers)
);

export const activeQuestionTestSelector = createSelector(
  activeQuestionSelector,
  testApiSelector,
  (activeQuestion, testData) => {
    if (testData?.questions) {
      return testData.questions[activeQuestion];
    }
  }
);

export const activeQuestionAnswerSelector = createSelector(
  activeQuestionTestSelector,
  selectedAnswersSelector,
  (activeQuestion, selectedAnswers) => {
    if (activeQuestion) {
      return get(selectedAnswers, activeQuestion?._id);
    }
  }
);
