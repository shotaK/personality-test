import styled from "styled-components";
import { Typography, Button } from "antd";
import { useHistory } from "react-router-dom";

import { WIZARD_TEST } from "Router/Routes";
import { useAppDispatch } from "Domain/hooks";
import { resetTest } from "Domain/TestWizard/TestWizardSlice";

const { Title } = Typography;

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem 1rem;
`;

const Home = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const startTest = () => {
    dispatch(resetTest());
    history.replace(WIZARD_TEST);
  };

  return (
    <Container>
      <Title>Welcome to the Personality Test</Title>
      <Button type="primary" shape="round" size="large" onClick={startTest}>
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
