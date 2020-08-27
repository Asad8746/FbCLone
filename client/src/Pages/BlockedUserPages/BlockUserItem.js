import React from "react";
import UnBlockBtn from "./UnBlockBtn.component";
const BlockUserItem = ({ user }) => {
  const { _id, f_name, l_name } = user;
  return (
    <div class="item">
      <div class="right floated content">
        <UnBlockBtn id={_id} />
      </div>
      <img
        class="ui avatar image"
        src={`http://localhost:5000/profile/profile_pic/${_id}`}
        alt={`${f_name} ${l_name} Profile Dp`}
      />
      <div class="content">
        {f_name} {l_name}
      </div>
    </div>
  );
};

export default BlockUserItem;
