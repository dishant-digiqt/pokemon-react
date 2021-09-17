import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Switch>
        <Route path="/:page" name="Layout">
          
          <Layout />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
