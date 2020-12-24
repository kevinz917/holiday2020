import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snowfall from "react-snowfall";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";

// Footer
import Footer from "./components/footer";

// Pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Demo from "./pages/demo";
import Open from "./pages/open";
import About from "./pages/about";
import { casCheck } from "./util/api";

function App() {
  const isLoading = useSelector((state) => state.state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      // console.log(auth);
      if (!auth || !auth.data.auth) {
        dispatch(SET_VAL("auth", false));
      } else {
        dispatch(SET_VAL("auth", true));
      }
    };
    onMount();
  }, []);

  return (
    <div className="backgroundLayout">
      <Router>
        <Switch>
          <Route path="/demo" component={Demo} />
          <Route path="/done" component={Done} />
          <Route path="/write" component={Write} />
          <Route path="/letter/:id" component={Open} />
          <Route path="/about" component={About} />
          <Route path="/" component={Landing} />
        </Switch>
        <Route
          render={({ location }) => {
            // Render snowflakes if not on write or done page
            return (
              !["/write", "/done", "/letter"].includes(location.pathname) && (
                <Snowfall snowflakeCount={100} />
              )
            );
          }}
        />
      </Router>
      {isLoading ? null : <Footer />}
    </div>
  );
}

export default App;
