import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snowfall from "react-snowfall";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import axios from "axios";

// Footer
import Footer from "./components/footer";

// Pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Demo from "./pages/demo";
import Open from "./pages/open";
import About from "./pages/about";
import Test from "./pages/test";
import { casCheck } from "./util/api";
import Memories from "./pages/memories";
import Ticker from "react-ticker";

import "./styles/layout.css";

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const [closed, setClosed] = useState(false);
  const isLoading = useSelector((state) => state.state.isLoading);

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      // console.log(auth);
      if (!auth || !auth.data.auth || !auth.data.user) {
        dispatch(SET_VAL("auth", 0));
        dispatch(SET_VAL("netid", ""));
      } else {
        dispatch(SET_VAL("auth", 1));
        dispatch(SET_VAL("netid", auth.data.user.netId));
      }
    };
    onMount();
  }, [dispatch]);

  return (
    <div className="backgroundLayout">
      {closed ? null : isLoading ? null : (
        <div className="alert">
          <span
            className="closebtn"
            onClick={() => {
              setClosed(true);
            }}
          >
            &times;
          </span>
          <Ticker>
            {() => (
              <div style={{ margin: "0 25px" }}>
                💌 &nbsp;New feature:{" "}
                <span
                  style={{ fontWeight: "bold", fontDecoration: "underline" }}
                >
                  one-time
                </span>{" "}
                Authentication via Yale CAS!
              </div>
            )}
          </Ticker>
        </div>
      )}
      <Router>
        <Switch>
          <Route path="/demo" component={Demo} />
          <Route path="/done" component={Done} />
          <Route path="/write" component={Write} />
          <Route path="/letter/:id" component={Open} />
          <Route path="/about" component={About} />
          <Route path="/user/:id" component={Memories} />
          {/* <Route path="/test" component={Test} /> */}
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

// <div className="alert fade-in">
//           <span
//             className="closebtn"
//             onClick={() => {
//               setClosed(true);
//             }}
//           >
//             &times;
//           </span>
//           💌 &nbsp;New feature: share a drawing with your YPost!
//         </div>
