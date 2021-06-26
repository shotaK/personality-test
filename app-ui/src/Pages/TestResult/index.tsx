import { useLocation, Redirect, useHistory } from "react-router-dom";
import { Result, Button } from "antd";

import { Score } from "Domain/TestWizard/Types";
import { HOME } from "Router/Routes";
import { useAppDispatch } from "Domain/hooks";
import { resetTest } from "Domain/TestWizard/TestWizardSlice";

const TestResult = () => {
  const { state }: { state: { testResult: Score } } = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  if (!state?.testResult) {
    return <Redirect to={HOME} />;
  }

  const restartTest = () => {
    dispatch(resetTest());
    history.replace(HOME);
  };

  return (
    <Result
      status="success"
      title="Congratulations you have finished the test."
      subTitle={state.testResult.description}
      extra={<Button onClick={restartTest}>Try Again</Button>}
    />
  );
};

export default TestResult;
