import toast from "react-hot-toast";
export const notify = (e) =>
  toast(e, {
    style: {
      border: "3px solid #ffebcc",
      padding: "13px",
      color: "white",
      backgroundColor: "#a1000e",
      fontSize: "20px",
    },
  });
