"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "@/lib/api";
import { toast } from "sonner";
import { Eye, MailOpen, Search } from "lucide-react";

import { inquiryStatusConfig, type InquiryStatus, type InquirySubmission } from "@/types";
import type { PaginationMeta } from "@/lib/api-response";

const STATUSES: (InquiryStatus | "all")[] = [
  "all",
  "new",
  "reviewed",
  "quoted",
  "booked",
  "archived",
];

export default function InquiriesPage() {
  const [items, setItems] = useState<InquirySubmission[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<InquiryStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = { page, limit: 10 };
      if (debouncedSearch) params.search = debouncedSearch;
      if (status !== "all") params.status = status;

      const response = await axios.get("/api/inquiries", { params });
      setItems(response.data.data ?? []);
      setMeta(response.data.meta ?? null);
    } catch (error) {
      toast.error("Failed to load inquiries", {
        description: axios.isAxiosError(error)
          ? `Error ${error.response?.status ?? "unknown"}`
          : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const statusOptions = useMemo(
    () =>
      STATUSES.map((value) => ({
        value,
        label:
          value === "all"
            ? "All statuses"
            : inquiryStatusConfig[value].label,
      })),
    [],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-muted-foreground tracking-[0.08em] uppercase text-xs mb-1">
            Operations
          </p>
          <h1 className="font-display text-2xl text-primary font-semibold">Inquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Contact-form submissions stored from the public site.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, contact, style…"
            className="pl-9 pr-3 py-3 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setStatus(option.value)}
            className={`px-3 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
              status === option.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted-foreground border-primary/20 hover:border-primary/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-primary/15 bg-primary/[0.02]">
              <tr className="text-xs tracking-[0.08em] uppercase text-muted-foreground font-semibold">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Wedding date</th>
                <th className="px-4 py-3">Guests</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    Loading inquiries…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <MailOpen className="w-6 h-6 text-primary/20 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No inquiries match these filters.</p>
                  </td>
                </tr>
              ) : (
                items.map((inquiry) => {
                  const config = inquiryStatusConfig[inquiry.status];
                  return (
                    <tr key={inquiry.id} className="hover:bg-primary/[0.02] transition-colors">
                      <td className="px-4 py-3 text-sm text-primary font-medium">
                        {inquiry.full_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {inquiry.email_or_whatsapp}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {inquiry.wedding_date || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {inquiry.number_of_guests || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs tracking-widest uppercase px-2 py-1 ${config.classes}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(inquiry.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/dashboard/inquiries/${inquiry.id}`}
                          className="inline-flex w-8 h-8 items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View inquiry"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-muted-foreground text-xs">
            Page {meta.page} of {meta.totalPages} · {meta.total} inquiries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={!meta.hasPrev}
              className="px-3 py-2 text-xs uppercase tracking-widest border border-primary/20 text-primary disabled:opacity-30"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((current) => current + 1)}
              disabled={!meta.hasNext}
              className="px-3 py-2 text-xs uppercase tracking-widest border border-primary/20 text-primary disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
