import axios from "axios";

export const getPromotedValidators = async () => {
  try {
    const response = await axios.get(
      "https://api.npoint.io/e362e89867d427eba6cf"
    );
    chrome.runtime.sendMessage({
      title: "debug-log",
      data: ["getPromotedValidators", response],
    });
  } catch (e) {
    throw new Error("getPromotedValidators failed");
  }
};
