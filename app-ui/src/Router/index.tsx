import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout as LayoutCommon } from "antd";
import styled from "styled-components/macro";

import Home from "Pages/Home/index";
import { HOME, WIZARD_TEST, TEST_RESULT } from "Router/Routes";
import WizardTest from "Pages/WizardTest";
import TestResult from "Pages/TestResult";

const Layout = styled(LayoutCommon)`
  min-height: 100vh;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={HOME} exact>
            <Home />
          </Route>
          <Route path={WIZARD_TEST}>
            <WizardTest />
          </Route>
          <Route path={TEST_RESULT}>
            <TestResult />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
