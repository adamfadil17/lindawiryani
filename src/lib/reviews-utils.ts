import type { Portfolio } from "@/types";
import type { ReviewItem } from "@/hook/useReviews";

export function deriveReviews(portfolios: Portfolio[]): ReviewItem[] {
  return portfolios
    .filter((p) => Boolean(p.review))
    .map((p) => ({
      couple: p.couple,
      origin: p.origin ?? "",
      review: p.review as string,
    }));
}
