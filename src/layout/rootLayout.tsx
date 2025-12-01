import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../utils/socket";

export function RootLayout() {
  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (raw) {
      const user = JSON.parse(raw);
      socket.auth = { userId: user.id };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Outlet />;
}
