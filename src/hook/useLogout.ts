import { useRouter } from "next/navigation";

import axios from "@/lib/api";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      // Clears the HttpOnly cookie server-side; the client can no longer
      // delete the token itself because it never sees it.
      await axios.post("/api/auth/logout", {});
    } catch {
      // Continue to the login page even if the request fails.
    } finally {
      router.push("/auth/login");
      router.refresh();
    }
  };

  return { logout };
}
