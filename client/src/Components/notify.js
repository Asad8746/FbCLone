import React from "react";
import { toast } from "react-toastify";
import Toast from "./Toast";

const notify = (lastNoti) => {
  toast(<Toast data={lastNoti} />, {
    hideProgressBar: true,
    style: {},
  });
};
export default notify;
