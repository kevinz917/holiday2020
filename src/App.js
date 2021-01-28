import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import { validateCookie, fetchUserInfo } from "./api/user";
import Cookies from "universal-cookie";
import { ToastContainer, Slide } from "react-toastify";
import PrivateRoute from "./components/routing/privateRoute";
import Navigation from "./components/nav/navigation";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Footer from "./components/footer";
import Help from "./components/help/help";

// pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Open from "./pages/open";
import About from "./pages/about";
import Memories from "./pages/memories";
import Notfound from "./pages/notfound";
import Profile from "./pages/profile/profile";
import Login from "./pages/public/login";
import Feedback from "./pages/feedback";
import Inbox from "./pages/inbox";
import Wall from "./pages/wall";

import "./styles/layout.css";

const cookies = new Cookies();
// const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.state.isLoading);

  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));

      if (document.cookie.indexOf("ypostUser") !== -1) {
        let res = await validateCookie(cookies.get("ypostUser").accessToken);
        if (res) {
          dispatch(SET_VAL("auth", 1));
          fetchUserInfo();
        }
      } else {
        dispatch(SET_VAL("auth", -1));
      }

      dispatch(SET_VAL("isLoading", false));
    };
    onMount();
  }, [dispatch]);

  return (
    <div className="backgroundLayout">
      {isLoading ? null : (
        <Router>
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/user/:id" component={Memories} />
            <PrivateRoute exact path="/feedback" component={Feedback} />
            <PrivateRoute exact path="/me" component={Profile} />
            <PrivateRoute exact path="/write" component={Write} />
            <PrivateRoute exact path="/done" component={Done} />
            <PrivateRoute exact path="/letter/:id" component={Open} />
            <PrivateRoute exact path="/wall" component={Wall} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Landing} />
            <Route exact={false} component={Notfound} />
          </Switch>
          <ToastContainer
            transition={Slide}
            autoClose={2000}
            hideProgressBar={true}
          />
        </Router>
      )}
      <Help />
    </div>
  );
}

export default App;
