import { useEffect, useState } from "react";
import { User } from "../types/new-strucutre";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ??
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((json) => {
        // Support both { data: {...} } envelope and flat response
        setUser(json.data ?? json);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}