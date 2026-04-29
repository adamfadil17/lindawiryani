import { useEffect, useState } from "react";

export function useInquiryBadge() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchBadge() {
      try {
        const res = await fetch("/api/inquiries/badge", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch inquiry badge");
        const data: { count: number } = await res.json();
        if (!cancelled) setCount(data.count);
      } catch (err) {
        console.error("[useInquiryBadge]", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBadge();


    const interval = setInterval(fetchBadge, 30 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { count, loading };
}
