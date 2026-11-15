import { useRouter } from "next/navigation";
import axios from "axios";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { headers: getAuthHeaders() });
    } catch {
      // lanjut logout meskipun request gagal
    } finally {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  };

  return { logout };
}