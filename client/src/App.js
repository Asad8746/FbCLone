import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import { url } from "./Api";
import { checkToken, getUnseenNotiCount, incNotiCount } from "./Actions";

import FindPeople from "./Pages/PeoplePage";
import Home from "./Pages/HomePage";
import NotFound from "./Pages/NotFoundPage";
import RegisterPage from "./Pages/RegisterPage";
import Profile from "./Pages/ProfilePage";
import Pages from "./Pages/PagesMainPage";
import CreatePageForm from "./Pages/CreateFbPagePage";
import Page from "./Pages/FbPage";
import PageSettings from "./Pages/PageSettingsPage";
import ExpiredLink from "./Pages/ExpiredLinkPage";
import BlockMessage from "./Pages/BlockMessagePage";
import BlockedUserPage from "./Pages/BlockedUserPage";
import ProfileEditPage from "./Pages/ProfileEditPage";
import GroupMainPage from "./Pages/GroupsPage";
import CreateGroupPage from "./Pages/CreateGroupPage";
import GroupPage from "./Pages/GroupPage";
import GroupRequestModal from "./Components/RequestsModal";
import GroupSettingPage from "./Pages/GroupSettingsPage";
import GroupMembersModal from "./Components/MembersModal";

import Login from "./Components/Login";
import Menu from "./Components/Menu/Menu";
import Container from "./Components/Container";
import ImageUploaderModal from "./Components/ImageUploaderModal";
import notify from "./Components/notify";
import ErrorBoundary from "./Components/ErrorBoundary";
import ConfirmPasswordModal from "./Components/ConfirmPasswordModal";
import EditPostModal from "./Components/EditPostModal";

import "./sass/index.scss";

const audio = new Audio(require("./sounds/noti.mp3"));

class App extends React.Component {
  componentDidMount() {
    this.props.checkToken(() => {
      this.props.getUnseenNotiCount();
      let socket = io(`${url}/notification`, {
        query: { id: this.props.id },
      });
      socket.on("notification", (data) => {
        audio.play();
        notify(data);
        this.props.incNotiCount();
      });
    });
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
        <ErrorBoundary>
          <Router history={history}>
            {!isAuth ? (
              <>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </>
            ) : (
              <Container>
                <Menu />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/edit" component={ProfileEditPage} />
                  <Route exact path="/post/:id" component={EditPostModal} />
                  <Route
                    exact
                    path="/upload"
                    component={ImageUploaderModal}
                  ></Route>
                  <Route exact path="/people" component={FindPeople} />
                  <Route exact path="/pages" component={Pages} />
                  <Route exact path="/pages/new" component={CreatePageForm} />
                  <Route exact path="/pages/:id" component={Page} />
                  <Route
                    exact
                    path="/blocked/message"
                    component={BlockMessage}
                  />
                  <Route
                    exact
                    path="/confirm"
                    component={ConfirmPasswordModal}
                  />
                  <Route exact path="/groups" component={GroupMainPage} />
                  <Route exact path="/groups/:id" component={GroupPage} />
                  <Route
                    exact
                    path="/group/create"
                    component={CreateGroupPage}
                  />
                  <Route
                    exact
                    path={"/groups/:id/settings"}
                    component={GroupSettingPage}
                  />
                  <Route
                    exact
                    path="/group/requests/:id"
                    component={GroupRequestModal}
                  />
                  <Route
                    exact
                    path="/group/members/:id"
                    component={GroupMembersModal}
                  />
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
              </Container>
            )}
          </Router>
        </ErrorBoundary>
        {isAuth && (
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            style={{ padding: "30px" }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.Authentication.isLoading,
    isAuth: state.Authentication.isAuthenticated,
    id: state.Authentication.id,
  };
};

export default connect(mapStateToProps, {
  checkToken,
  getUnseenNotiCount,
  incNotiCount,
})(App);
