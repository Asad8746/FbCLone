import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuDropDown from "../MenuDropDown";
import Notification from "../Notification/";
import { url } from "../../Api";
import { ReactComponent as ActiveHomeSvg } from "../../Images/home.svg";
import { ReactComponent as PeopleSvg } from "../../Images/people.svg";
import { ReactComponent as GroupSvg } from "../../Images/group.svg";
import { ReactComponent as Logo } from "../../Images/logo.svg";
import { ReactComponent as HomeSvg } from "../../Images/activeHome.svg";
import { ReactComponent as PageSvg } from "../../Images/page.svg";
import MenuItem from "./MenuItem";
import NotiIcon from "../NotiIcon";
import CustomLink from "../CustomLink";
import SettingDropDown from "../SettingsDropDown";
import "./index.style.scss";

const Menu = ({ isAuthenticated, id, f_name, l_name, ...rest }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [currentActiveItem, setCurrentActiveItem] = useState("");
  const onItemClick = (value) => {
    if (currentActiveItem === value) {
      setShowDropDown(false);
      setCurrentActiveItem("");
    } else {
      setShowDropDown(true);
      setCurrentActiveItem(value);
    }
  };
  return (
    <>
      {showDropDown && (
        <div className="dropdown-modal" onClick={() => setShowDropDown(false)}>
          <MenuDropDown>
            {
              { noti: <Notification />, dropdown: <SettingDropDown /> }[
                currentActiveItem
              ]
            }
          </MenuDropDown>
        </div>
      )}
      <div className="menu menu__top">
        <div className="menu__left">
          <Link className="menu__avatar-container" to={`/profile/${id}`}>
            <img
              className="menu__avatar"
              src={`${url}/profile/profile_pic/${id}?${Date.now()}`}
              alt={`${f_name} ${l_name} Dp`}
            />
            <p className="menu__name">{`${f_name} ${l_name}`}</p>
          </Link>
        </div>
        <div className="menu__center">
          <ul className="menu__list">
            <li className="menu-center__item menu__link">
              <CustomLink
                to="/"
                className="menu__link"
                render={(isMatched) =>
                  isMatched ? (
                    <ActiveHomeSvg className="menu__icon active__item" />
                  ) : (
                    <HomeSvg className="menu__icon" />
                  )
                }
              />
            </li>
            <li className="menu-center__item menu__link">
              <CustomLink
                to="/people"
                render={(isMatched) => (
                  <PeopleSvg
                    className={`menu__icon ${isMatched ? "active__item" : ""}`}
                  />
                )}
              />
            </li>
            <li className="menu-center__item ">
              <Logo className="menu__logo" />
            </li>

            <li className="menu-center__item menu__link">
              <CustomLink
                to="/pages"
                render={(isMatched) => (
                  <PageSvg
                    className={`menu__icon ${isMatched ? "active__item" : ""}`}
                  />
                )}
              />
            </li>
            <li className="menu-center__item menu__link">
              <CustomLink
                to="/groups"
                render={(isMatched) => (
                  <GroupSvg
                    className={`menu__icon ${isMatched ? "active__item" : ""}`}
                  />
                )}
              />
            </li>
          </ul>
        </div>
        <div className="menu__right">
          <ul className="menu__list">
            <MenuItem onClick={() => onItemClick("noti")} icon={<NotiIcon />} />
            <MenuItem
              onClick={() => onItemClick("dropdown")}
              icon={<i className="dropdown icon" id="setting__icon"></i>}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Authentication.isAuthenticated,
    id: state.Authentication.id,
    f_name: state.Authentication.f_name,
    l_name: state.Authentication.l_name,
  };
};

export default connect(mapStateToProps)(Menu);
