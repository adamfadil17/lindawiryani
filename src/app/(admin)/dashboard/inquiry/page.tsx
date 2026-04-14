"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Heart,
} from "lucide-react";
import { InquiryStatus, InquirySubmission, inquiryStatusConfig } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import type { PaginationMeta } from "@/lib/api-response";

const LIMIT = 9;
const ALL_STATUSES: InquiryStatus[] = [
  "new",
  "reviewed",
  "quoted",
  "booked",
  "archived",
];

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 bg-primary/10 flex-shrink-0" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-2.5 w-12 bg-primary/10 rounded" />
            <div className="h-4 w-40 bg-primary/10 rounded" />
            <div className="h-3 w-24 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="h-6 w-16 bg-primary/10 rounded flex-shrink-0" />
      </div>
      <div className="space-y-2 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-primary/10 rounded-full flex-shrink-0" />
            <div className="h-3 bg-primary/10 rounded w-3/4" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-primary/10 rounded" />
        <div className="h-6 w-28 bg-primary/10 rounded" />
      </div>
      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="h-3 w-20 bg-primary/10 rounded" />
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-primary/10" />
          <div className="w-8 h-8 bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

function SkeletonStatCard() {
  return (
    <div className="p-5 border border-primary/20 bg-white animate-pulse">
      <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
      <div className="h-7 bg-primary/10 w-10 rounded" />
    </div>
  );
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const { label, classes } = inquiryStatusConfig[status];
  return (
    <span
      className={`text-xs tracking-widest uppercase px-2.5 py-1 font-medium flex-shrink-0 ${classes}`}
    >
      {label}
    </span>
  );
}

function InquiryCard({
  inquiry,
  onDelete,
}: {
  inquiry: InquirySubmission;
  onDelete: (inquiry: InquirySubmission) => void;
}) {
  const submittedDate = new Date(inquiry.submitted_at).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );

  const weddingDateFormatted = inquiry.wedding_date
    ? new Date(inquiry.wedding_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5 bg-rose-50">
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs tracking-widest uppercase mb-0.5 text-rose-400/80">
              Inquiry
            </p>
            <h3 className="text-primary font-semibold text-base leading-snug truncate">
              {inquiry.name_of_bride} & {inquiry.name_of_groom}
            </h3>
            <p className="text-primary/60 text-xs tracking-wider mt-0.5 truncate">
              {inquiry.your_name}
            </p>
          </div>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">
            {inquiry.your_email}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs">{inquiry.telephone}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">
            {inquiry.wedding_venue}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs">
            {weddingDateFormatted}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs tracking-wider text-primary/60 bg-primary/5 border border-primary/10 px-2.5 py-1">
          {inquiry.number_of_attendance} guests
        </span>
        <span className="text-xs tracking-wider text-primary/60 bg-primary/5 border border-primary/10 px-2.5 py-1 truncate max-w-[160px]">
          {inquiry.approximate_wedding_budget}
        </span>
      </div>

      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-primary/30" />
          <span className="text-primary/40 text-xs">{submittedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/inquiry/${inquiry.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(inquiry)}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete Inquiry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  const getVisiblePages = (): (number | "...")[] => {
    if (meta.totalPages <= 7) return pages;
    const range: (number | "...")[] = [];
    if (meta.page <= 4) {
      range.push(...pages.slice(0, 5), "...", meta.totalPages);
    } else if (meta.page >= meta.totalPages - 3) {
      range.push(1, "...", ...pages.slice(meta.totalPages - 5));
    } else {
      range.push(
        1,
        "...",
        meta.page - 1,
        meta.page,
        meta.page + 1,
        "...",
        meta.totalPages,
      );
    }
    return range;
  };

  if (meta.total === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
      <p className="text-primary/60 text-xs tracking-wider">
        Showing{" "}
        <span className="text-primary font-medium">
          {(meta.page - 1) * meta.limit + 1}–
          {Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="text-primary font-medium">{meta.total}</span>{" "}
        inquiries
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrev}
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 h-8 flex items-center justify-center text-primary/40 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center text-xs tracking-wider transition-colors hover:cursor-pointer ${
                meta.page === p
                  ? "bg-primary text-white border border-primary"
                  : "border border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNext}
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function DashboardInquiryPage() {
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteStatus, setDeleteStatus] = useState<
    "idle" | "confirm" | "deleting"
  >("idle");
  const [deleteTarget, setDeleteTarget] = useState<InquirySubmission | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        page: currentPage,
        limit: LIMIT,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await axios.get("/api/inquiries", { params });
      setInquiries(response.data.data ?? []);
      setPaginationMeta(response.data.meta ?? null);
    } catch (err) {
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load inquiries";
      toast.error("Failed to load inquiries", { description: errorMsg });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    getInquiries();
  }, [getInquiries]);

  const handleStatusChange = (value: "all" | InquiryStatus) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const openDeleteModal = (inquiry: InquirySubmission) => {
    setDeleteTarget(inquiry);
    setDeleteStatus("confirm");
  };

  const closeDeleteModal = () => {
    if (deleteStatus === "deleting") return;
    setDeleteTarget(null);
    setDeleteStatus("idle");
  };

  const deleteInquiryById = async () => {
    if (!deleteTarget) return;
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/inquiries/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      toast.success("Inquiry deleted!", {
        description: "The inquiry has been removed from the system.",
      });
      const isLastOnPage = inquiries.length === 1 && currentPage > 1;
      setDeleteTarget(null);
      setDeleteStatus("idle");
      if (isLastOnPage) {
        setCurrentPage((prev) => prev - 1);
      } else {
        getInquiries();
      }
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      toast.error("Failed to delete", { description: errorMsg });
      setDeleteStatus("confirm");
    }
  };

  const totalCount = paginationMeta?.total ?? 0;
  const hasActiveFilters = !!debouncedSearch || statusFilter !== "all";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Inquiries
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total inquiries`
            )}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <button
            onClick={() => handleStatusChange("all")}
            className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
              statusFilter === "all"
                ? "bg-primary text-white border-primary"
                : "bg-white border-primary/20 text-primary hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Users
                className={`w-3.5 h-3.5 ${statusFilter === "all" ? "text-white/70" : "text-primary/50"}`}
              />
              <p
                className={`text-xs tracking-[0.2em] uppercase ${
                  statusFilter === "all" ? "text-white/80" : "text-primary/80"
                }`}
              >
                All
              </p>
            </div>
            <p className="text-2xl font-semibold">{totalCount}</p>
          </button>

          {ALL_STATUSES.map((status) => {
            const isActive = statusFilter === status;
            const { label } = inquiryStatusConfig[status];
            return (
              <button
                key={status}
                onClick={() => handleStatusChange(isActive ? "all" : status)}
                className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-primary/20 text-primary hover:border-primary/30"
                }`}
              >
                <p
                  className={`text-xs tracking-[0.2em] uppercase mb-1.5 ${
                    isActive ? "text-white/80" : "text-primary/80"
                  }`}
                >
                  {label}
                </p>
                <p className="text-2xl font-semibold">
                  {isActive ? (paginationMeta?.total ?? "—") : "—"}
                </p>
              </button>
            );
          })}
        </div>
      )}

      <div className="bg-white border border-primary/20 p-3 mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search by couple name, contact, venue, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors hover:cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        <div className="relative shrink-0">
          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusChange(e.target.value as "all" | InquiryStatus)
            }
            className="w-full sm:w-44 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {inquiryStatusConfig[s].label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>

        {hasActiveFilters && (
          <>
            <div className="hidden sm:block w-px h-8 bg-primary/20 self-center" />
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm tracking-widest uppercase text-primary/50 hover:text-primary transition-colors whitespace-nowrap hover:cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </>
        )}
      </div>

      {hasActiveFilters && !isLoading && paginationMeta && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {paginationMeta.total} inquir
          {paginationMeta.total !== 1 ? "ies" : "y"}
          {statusFilter !== "all" &&
            ` · ${inquiryStatusConfig[statusFilter].label}`}
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </p>
      )}

      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Heart className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {debouncedSearch
              ? `No inquiries match "${debouncedSearch}"`
              : "No inquiries in this category yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {paginationMeta && !isLoading && (
        <Pagination meta={paginationMeta} onPageChange={setCurrentPage} />
      )}

      {(deleteStatus === "confirm" || deleteStatus === "deleting") &&
        deleteTarget && (
          <DeleteModal
            name={`${deleteTarget.name_of_bride} & ${deleteTarget.name_of_groom}`}
            onConfirm={deleteInquiryById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}
