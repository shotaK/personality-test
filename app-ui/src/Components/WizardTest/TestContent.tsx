import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import {
  Card,
  Typography,
  Button,
  Radio,
  Space,
  Divider,
  Progress,
} from "antd";

import { useAppDispatch, useAppSelector } from "Domain/hooks";
import {
  activeQuestionAnswerSelector,
  activeQuestionSelector,
  activeQuestionTestSelector,
  questionsAmountSelector,
  wasNoneAnsweredSelector,
} from "Domain/TestWizard/TestWizardSelectors";
import {
  goToNextQuestion,
  goToPreviousQuestion,
  selectAnswer,
} from "Domain/TestWizard/TestWizardSlice";
import useTestResult from "Components/WizardTest/useTestResult";
import { TEST_RESULT } from "Router/Routes";

const { Title, Text } = Typography;

const ProgressBar = styled.div`
  margin-bottom: 1rem;
`;

const Sector = styled.div`
  margin-bottom: 2rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const TestContent = () => {
  const question = useAppSelector(activeQuestionTestSelector);
  const activeQuestionAnswer = useAppSelector(activeQuestionAnswerSelector);
  const activeQuestion = useAppSelector(activeQuestionSelector);
  const questionsAmount = useAppSelector(questionsAmountSelector);
  const wasNoneAnswered = useAppSelector(wasNoneAnsweredSelector);
  const { getTestResult } = useTestResult();
  const dispatch = useAppDispatch();
  const history = useHistory();

  if (!question || !questionsAmount) {
    return null;
  }

  const activeQuestionNumber = activeQuestion + 1;
  const isFirstQuestion = activeQuestion === 0;
  const isLastQuestion = activeQuestionNumber === questionsAmount;

  const { title, answers } = question;

  const onChange = () => {};

  const handleSelect = (answerId: string) => {
    dispatch(selectAnswer({ questionId: question._id, answerId }));
  };

  const goToNext = () => {
    dispatch(goToNextQuestion());
  };

  const goToPrev = () => {
    dispatch(goToPreviousQuestion());
  };

  const finalizeTest = () => {
    if (wasNoneAnswered) {
      message.error("Please select at least one answer");
    } else {
      const testResult = getTestResult();
      history.replace({
        pathname: TEST_RESULT,
        state: { testResult: testResult },
      });
    }
  };

  return (
    <Card style={{ width: 600 }} bordered>
      <ProgressBar>
        <Progress percent={(activeQuestion * 100) / questionsAmount} />
      </ProgressBar>
      <Sector>
        <Text type="danger">
          QUESTION {activeQuestionNumber} OF {questionsAmount}
        </Text>
      </Sector>
      <TitleWrapper>
        <Title level={3}>{title}</Title>
      </TitleWrapper>
      <Radio.Group onChange={onChange} value={activeQuestionAnswer}>
        <Space direction="vertical" size="middle">
          {answers.map(({ _id, title }) => (
            <Radio key={_id} value={_id} onChange={() => handleSelect(_id)}>
              {title}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      <Divider />

      <Space size="middle">
        {!isFirstQuestion && (
          <Button onClick={goToPrev} data-testid="action-previous">
            Previous
          </Button>
        )}
        {!isLastQuestion && (
          <Button type="primary" onClick={goToNext} data-testid="action-next">
            Next
          </Button>
        )}
        {isLastQuestion && (
          <Button
            type="primary"
            onClick={finalizeTest}
            data-testid="action-finish"
          >
            Finish
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default TestContent;
