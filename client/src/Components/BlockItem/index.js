import React from "react";
import { url } from "../../Api";
import PropTypes from "prop-types";

import UnBlockBtn from "../UnBlockBtn";
import "./index.style.scss";
const BlockUserItem = ({ user }) => {
  const { _id, f_name, l_name } = user;
  return (
    <div className="block__item">
      <div className="block__item__content">
        <img
          className="avatar"
          src={`${url}/profile/profile_pic/${_id}`}
          alt={`${f_name} ${l_name} Profile Dp`}
        />
        <p>
          {f_name} {l_name}
        </p>
      </div>
      <UnBlockBtn id={_id} />
    </div>
  );
};

BlockUserItem.defaultProps = {
  user: {
    _id: "",
    f_name: "",
    l_name: "",
  },
};
BlockUserItem.propTypes = {
  user: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    f_name: PropTypes.string.isRequired,
    l_name: PropTypes.string.isRequired,
  }),
};

export default BlockUserItem;
