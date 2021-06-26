import styled from "styled-components";
import { Skeleton, Alert } from "antd";

import TestContent from "Components/WizardTest/TestContent";
import { useGetTestsAllQuery } from "Domain/TestWizard/TestWizardService";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 2rem;
`;

const WizardTest = () => {
  const { isFetching, isError } = useGetTestsAllQuery();
  if (isFetching) {
    return <Skeleton />;
  }

  if (isError) {
    <Alert
      message="Error"
      description="There was an error with getting the test. Please try again."
      type="error"
      showIcon
    />;
  }

  return (
    <Container>
      <TestContent />
    </Container>
  );
};

export default WizardTest;
