import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import toast from "react-hot-toast";
import { createViewerToken } from "@/actions/token";

const useToken = (hostId: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    let user;
    const getUserToken = async () => {
      try {
        const viewerTokwen = await createViewerToken(hostId);
        setToken(viewerTokwen);

        const decodedToken = jwtDecode(viewerTokwen) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken?.sub;

        if (name) setName(name);
        if (identity) setIdentity(identity);
      } catch {
        toast.error("Failed to get token");
      }
    };
    getUserToken();
  }, [hostId]);

  return {
    token,
    name,
    identity,
  };
};

export default useToken;
