import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";

import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import ImageUploaderModal from "./ImageUploader/ImageUploaderModal";
import FindPeople from "../Pages/PeoplePage/FindPeople.page";
import Home from "../Pages/HomePage/Home.page";
import Actions from "../Actions";
import { connect } from "react-redux";
import NotFound from "../Pages/NotFoundPage/NotFound";
import MainPage from "../Pages/RegisterPage/Register.page";
import Profile from "../Pages/ProfilePage/ProfilePage";
import EditPostPage from "./Posts/EditPostPage/EditPost";
import Pages from "../Pages/PagesMainPage/PagesMainPage";
import CreatePageForm from "../Pages/CreateFbPagePage/CreatePage";
import Page from "../Pages/FbPage/Page";
import PageSettings from "../Pages/PageSettingsPage/PageSettings.page";
import ExpiredLink from "../Pages/ExpiredLinkPage/ExpiredLink.page";
import BlockMessage from "../Pages/BlockedUserPages/BlockMessage.page";
import BlockedUserPage from "../Pages/BlockedUserPages/BlockedUsers.page";
import ProfileEditPage from "../Pages/ProfileEditPage/ProfileEdit.page";
import ConfirmPasswordModal from "./ConfirmPasswordModal/ConfirmPassModal";

const { checkToken } = Actions;
class App extends React.Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    const { isLoading, isAuth } = this.props;
    if (isLoading) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
    return (
      <div>
        <Router history={history}>
          <Menu />
          {!isAuth ? (
            <>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </>
          ) : (
            <>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/edit" component={ProfileEditPage} />
                <Route exact path="/post/:id" component={EditPostPage} />
                <Route
                  exact
                  path="/upload"
                  component={ImageUploaderModal}
                ></Route>
                <Route exact path="/people" component={FindPeople} />
                <Route exact path="/pages" component={Pages} />
                <Route exact path="/pages/new" component={CreatePageForm} />
                <Route exact path="/pages/:id" component={Page} />
                <Route exact path="/blocked/message" component={BlockMessage} />
                <Route exact path="/confirm" component={ConfirmPasswordModal} />

                <Route
                  exact
                  path="/blocked/users"
                  component={BlockedUserPage}
                />
                <Route
                  exact
                  path="/pages/:id/settings"
                  component={PageSettings}
                />
                <Route exact path="/expired" component={ExpiredLink} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </>
          )}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.Authentication.isLoading,
    isAuth: state.Authentication.isAuthenticated,
  };
};

export default connect(mapStateToProps, { checkToken })(App);
