/* eslint-disable quotes */
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import Nav from "./components/Nav/Nav";
import SignOut from "./components/Forms/SignOut/SignOut";
import { checkAuth } from "./redux/ac/user.ac";
import Main from "./components/Main/Main";
import CheckoutPageLayout from './components/CheckoutPageLayout/CheckoutPageLayout';
import AddForm from './components/Forms/AddForm/AddForm';
import UserProfile from "./components/UserProfile/UserProfile";
import BillPage from "./components/BillPage/BillPage";
import IndexPage from "./components/IndexPage/IndexPage";
import ThankU from "./components/ThankU/ThankU";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      {user
      && <Nav />}

      <div className="container d-flex justify-content-center align-items-start vh-100 py-5 ">
        <Switch>
          <Route exact path="/users/:id">
            <UserProfile />
          </Route>

          <Route exact path="/bill/:id">
            <BillPage />
          </Route>

          <Route exact path="/CheckoutPageLayout">
            <CheckoutPageLayout />
          </Route>

          <Route exact path="/success">
            <ThankU />
          </Route>

          <Route exact path="/auth/signout">
            <SignOut />
          </Route>

          <Route exact path="/add">
            <AddForm />
          </Route>

          <Route exact path="/">
            {user ? <Main /> : <IndexPage />}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
