export const transformGroup = (group, profile_id) => {
  const {
    _id: id,
    group_privacy: privacy,
    created_on,
    name,
    description,
    members,
    requests,
  } = group;
  const { f_name, l_name } = group.group_admin_id;
  return {
    privacy,
    created_on,
    id,
    name,
    description,
    members,
    requests,
    admin_name: `${f_name} ${l_name}`,
    isPrivate: privacy === "private",
  };
};

export const transformComments = (comments) => {
  let list = {};
  console.log("Comments Length", comments.length);
  for (let comment of comments) {
    console.log("Comment", comment);
    return (list[comment._id] = comment);
  }
  return list;
};
