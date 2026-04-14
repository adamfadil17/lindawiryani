"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Briefcase,
  Users,
  UserCheck,
  Clock,
  ExternalLink,
  Mail,
  Phone,
  Plus,
  Layers,
  Pencil,
} from "lucide-react";
import {
  SubmissionType,
  SubmissionStatus,
  VendorSubmission,
  CareerSubmission,
  Submission,
  submissionStatusConfig,
  OpenPosition,
} from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { toast } from "sonner";


const SUBMISSION_LIMIT = 6;
const POSITION_LIMIT = 8;


type TypeFilter = "All" | SubmissionType;
type StatusFilter = "All" | SubmissionStatus;
type DeleteStatus = "idle" | "confirm" | "deleting";


interface PageState {
  submissions: Submission[];
  submissionMeta: PaginationMeta | null;
  isSubmissionsLoading: boolean;
  submissionSearch: string;
  submissionDebouncedSearch: string;
  typeFilter: TypeFilter;
  statusFilter: StatusFilter;
  submissionPage: number;
  deleteSubmissionStatus: DeleteStatus;
  deleteSubmissionTarget: Submission | null;
  positions: OpenPosition[];
  positionMeta: PaginationMeta | null;
  isPositionsLoading: boolean;
  positionSearch: string;
  positionDebouncedSearch: string;
  positionPage: number;
  deletePositionStatus: DeleteStatus;
  deletePositionTarget: OpenPosition | null;
}

type PageAction =
  | { type: "FETCH_SUBMISSIONS_START" }
  | { type: "FETCH_SUBMISSIONS_SUCCESS"; submissions: Submission[]; meta: PaginationMeta | null }
  | { type: "FETCH_SUBMISSIONS_ERROR" }
  | { type: "FETCH_POSITIONS_START" }
  | { type: "FETCH_POSITIONS_SUCCESS"; positions: OpenPosition[]; meta: PaginationMeta | null }
  | { type: "FETCH_POSITIONS_ERROR" }
  | { type: "SET_SUBMISSION_SEARCH"; value: string }
  | { type: "SET_SUBMISSION_DEBOUNCED"; value: string }
  | { type: "SET_TYPE_FILTER"; value: TypeFilter }
  | { type: "SET_STATUS_FILTER"; value: StatusFilter }
  | { type: "SET_SUBMISSION_PAGE"; page: number }
  | { type: "CLEAR_SUBMISSION_FILTERS" }
  | { type: "SET_POSITION_SEARCH"; value: string }
  | { type: "SET_POSITION_DEBOUNCED"; value: string }
  | { type: "SET_POSITION_PAGE"; page: number }
  | { type: "OPEN_DELETE_SUBMISSION"; submission: Submission }
  | { type: "CLOSE_DELETE_SUBMISSION" }
  | { type: "DELETE_SUBMISSION_START" }
  | { type: "DELETE_SUBMISSION_SUCCESS" }
  | { type: "DELETE_SUBMISSION_ERROR" }
  | { type: "OPEN_DELETE_POSITION"; position: OpenPosition }
  | { type: "CLOSE_DELETE_POSITION" }
  | { type: "DELETE_POSITION_START" }
  | { type: "DELETE_POSITION_SUCCESS" }
  | { type: "DELETE_POSITION_ERROR" };

const initialState: PageState = {
  submissions: [],
  submissionMeta: null,
  isSubmissionsLoading: true,
  submissionSearch: "",
  submissionDebouncedSearch: "",
  typeFilter: "All",
  statusFilter: "All",
  submissionPage: 1,
  deleteSubmissionStatus: "idle",
  deleteSubmissionTarget: null,
  positions: [],
  positionMeta: null,
  isPositionsLoading: true,
  positionSearch: "",
  positionDebouncedSearch: "",
  positionPage: 1,
  deletePositionStatus: "idle",
  deletePositionTarget: null,
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_SUBMISSIONS_START":
      return { ...state, isSubmissionsLoading: true };
    case "FETCH_SUBMISSIONS_SUCCESS":
      return { ...state, isSubmissionsLoading: false, submissions: action.submissions, submissionMeta: action.meta };
    case "FETCH_SUBMISSIONS_ERROR":
      return { ...state, isSubmissionsLoading: false };
    case "FETCH_POSITIONS_START":
      return { ...state, isPositionsLoading: true };
    case "FETCH_POSITIONS_SUCCESS":
      return { ...state, isPositionsLoading: false, positions: action.positions, positionMeta: action.meta };
    case "FETCH_POSITIONS_ERROR":
      return { ...state, isPositionsLoading: false };
    case "SET_SUBMISSION_SEARCH":
      return { ...state, submissionSearch: action.value };
    case "SET_SUBMISSION_DEBOUNCED":
      return { ...state, submissionDebouncedSearch: action.value, submissionPage: 1 };
    case "SET_TYPE_FILTER":
      return { ...state, typeFilter: action.value, submissionPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.value, submissionPage: 1 };
    case "SET_SUBMISSION_PAGE":
      return { ...state, submissionPage: action.page };
    case "CLEAR_SUBMISSION_FILTERS":
      return { ...state, submissionSearch: "", submissionDebouncedSearch: "", typeFilter: "All", statusFilter: "All", submissionPage: 1 };
    case "SET_POSITION_SEARCH":
      return { ...state, positionSearch: action.value };
    case "SET_POSITION_DEBOUNCED":
      return { ...state, positionDebouncedSearch: action.value, positionPage: 1 };
    case "SET_POSITION_PAGE":
      return { ...state, positionPage: action.page };
    case "OPEN_DELETE_SUBMISSION":
      return { ...state, deleteSubmissionTarget: action.submission, deleteSubmissionStatus: "confirm" };
    case "CLOSE_DELETE_SUBMISSION":
      return state.deleteSubmissionStatus === "deleting"
        ? state
        : { ...state, deleteSubmissionTarget: null, deleteSubmissionStatus: "idle" };
    case "DELETE_SUBMISSION_START":
      return { ...state, deleteSubmissionStatus: "deleting" };
    case "DELETE_SUBMISSION_SUCCESS":
      return { ...state, deleteSubmissionTarget: null, deleteSubmissionStatus: "idle" };
    case "DELETE_SUBMISSION_ERROR":
      return { ...state, deleteSubmissionStatus: "confirm" };
    case "OPEN_DELETE_POSITION":
      return { ...state, deletePositionTarget: action.position, deletePositionStatus: "confirm" };
    case "CLOSE_DELETE_POSITION":
      return state.deletePositionStatus === "deleting"
        ? state
        : { ...state, deletePositionTarget: null, deletePositionStatus: "idle" };
    case "DELETE_POSITION_START":
      return { ...state, deletePositionStatus: "deleting" };
    case "DELETE_POSITION_SUCCESS":
      return { ...state, deletePositionTarget: null, deletePositionStatus: "idle" };
    case "DELETE_POSITION_ERROR":
      return { ...state, deletePositionStatus: "confirm" };

    default:
      return state;
  }
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 bg-primary/10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-primary/10 w-1/4 rounded" />
          <div className="h-4 bg-primary/10 w-2/3 rounded" />
          <div className="h-3 bg-primary/10 w-1/3 rounded" />
        </div>
        <div className="h-5 w-20 bg-primary/10 rounded" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-primary/10 w-full rounded" />
        <div className="h-3 bg-primary/10 w-3/4 rounded" />
        <div className="h-3 bg-primary/10 w-1/2 rounded" />
      </div>
      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="h-3 w-24 bg-primary/10 rounded" />
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-primary/10 rounded" />
          <div className="w-8 h-8 bg-primary/10 rounded" />
        </div>
      </div>
    </div>
  );
}

function SkeletonPositionCard() {
  return (
    <div className="bg-white border border-primary/20 p-5 animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-primary/10 flex-shrink-0" />
          <div className="space-y-2">
            <div className="h-4 bg-primary/10 w-32 rounded" />
            <div className="h-3 bg-primary/10 w-20 rounded" />
          </div>
        </div>
        <div className="h-5 w-16 bg-primary/10 rounded" />
      </div>
      <div className="h-3 bg-primary/10 w-full rounded mb-2" />
      <div className="h-3 bg-primary/10 w-4/5 rounded mb-4" />
      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="h-3 w-20 bg-primary/10 rounded" />
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-primary/10 rounded" />
          <div className="w-8 h-8 bg-primary/10 rounded" />
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


function StatusBadge({ status }: { status: SubmissionStatus }) {
  const { label, classes } = submissionStatusConfig[status];
  return (
    <span className={`text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${classes}`}>
      {label}
    </span>
  );
}


function Pagination({ meta, onPageChange }: { meta: PaginationMeta; onPageChange: (page: number) => void }) {
  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  const getVisiblePages = (): (number | "...")[] => {
    if (meta.totalPages <= 7) return pages;
    const range: (number | "...")[] = [];
    if (meta.page <= 4) {
      range.push(...pages.slice(0, 5), "...", meta.totalPages);
    } else if (meta.page >= meta.totalPages - 3) {
      range.push(1, "...", ...pages.slice(meta.totalPages - 5));
    } else {
      range.push(1, "...", meta.page - 1, meta.page, meta.page + 1, "...", meta.totalPages);
    }
    return range;
  };

  if (meta.total === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
      <p className="text-primary/60 text-xs tracking-wider">
        Showing{" "}
        <span className="text-primary font-medium">
          {(meta.page - 1) * meta.limit + 1}–{Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="text-primary font-medium">{meta.total}</span>
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
            <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-primary/40 text-sm">…</span>
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


function PositionCard({ position, onDelete }: { position: OpenPosition; onDelete: (position: OpenPosition) => void }) {
  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5 bg-primary/5">
            <Briefcase className="w-4 h-4 text-primary/50" />
          </div>
          <div className="min-w-0">
            <h3 className="text-primary font-semibold text-base leading-snug">{position.title}</h3>
            <p className="text-primary/50 text-xs tracking-wider mt-0.5">{position.type}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className="text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/5 text-primary/60 border border-primary/10">
            {position.level}
          </span>
          {!position.is_active && (
            <span className="text-xs tracking-widest uppercase px-2 py-0.5 bg-primary/5 text-primary/30 border border-primary/10">
              Inactive
            </span>
          )}
        </div>
      </div>
      <p className="text-primary/70 text-sm leading-relaxed line-clamp-2 mb-4">{position.desc}</p>
      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-primary/30" />
          <span className="text-primary/40 text-xs">{position.level}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/career-partnership/positions/${position.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
            title="Edit Position"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(position)}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete Position"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


function SubmissionCard({ submission, onDelete }: { submission: Submission; onDelete: (submission: Submission) => void }) {
  const isVendor = submission.type === "vendor";

  const name = isVendor
    ? (submission as VendorSubmission).company_name
    : (submission as CareerSubmission).full_name;
  const subLabel = isVendor
    ? (submission as VendorSubmission).vendor_category
    : (submission as CareerSubmission).position;
  const website = isVendor
    ? (submission as VendorSubmission).website
    : (submission as CareerSubmission).linked_in;

  const submittedDate = new Date(submission.submitted_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5 ${isVendor ? "bg-primary/10" : "bg-amber-50"}`}>
            {isVendor
              ? <Briefcase className="w-4 h-4 text-primary/60" />
              : <UserCheck className="w-4 h-4 text-amber-500" />
            }
          </div>
          <div className="min-w-0">
            <p className={`text-xs tracking-widest uppercase mb-0.5 ${isVendor ? "text-primary/50" : "text-amber-500/80"}`}>
              {isVendor ? "Vendor" : "Career"}
            </p>
            <h3 className="text-primary font-semibold text-base leading-snug truncate">{name}</h3>
            {subLabel && <p className="text-primary/60 text-xs tracking-wider mt-0.5">{subLabel}</p>}
          </div>
        </div>
        <StatusBadge status={submission.status} />
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">{submission.email}</span>
        </div>
        {submission.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-primary/40 flex-shrink-0" />
            <span className="text-primary/70 text-xs">{submission.phone}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-1.5">
            <ExternalLink className="w-3 h-3 text-primary/40 flex-shrink-0" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 text-xs truncate hover:text-primary underline-offset-2 hover:underline transition-colors"
            >
              {website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-primary/30" />
          <span className="text-primary/40 text-xs">{submittedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/career-partnership/submissions/${submission.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(submission)}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete Submission"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


export default function CareerPartnershipPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    submissions, submissionMeta, isSubmissionsLoading,
    submissionSearch, submissionDebouncedSearch, typeFilter, statusFilter, submissionPage,
    deleteSubmissionStatus, deleteSubmissionTarget,
    positions, positionMeta, isPositionsLoading,
    positionSearch, positionDebouncedSearch, positionPage,
    deletePositionStatus, deletePositionTarget,
  } = state;

  const submissionDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const positionDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submissionAbortRef = useRef<AbortController | null>(null);
  const positionAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (submissionDebounceRef.current) clearTimeout(submissionDebounceRef.current);
    submissionDebounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_SUBMISSION_DEBOUNCED", value: submissionSearch });
    }, 400);
    return () => {
      if (submissionDebounceRef.current) clearTimeout(submissionDebounceRef.current);
    };
  }, [submissionSearch]);

  useEffect(() => {
    if (positionDebounceRef.current) clearTimeout(positionDebounceRef.current);
    positionDebounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_POSITION_DEBOUNCED", value: positionSearch });
    }, 400);
    return () => {
      if (positionDebounceRef.current) clearTimeout(positionDebounceRef.current);
    };
  }, [positionSearch]);

  const getSubmissions = useCallback(async () => {
    submissionAbortRef.current?.abort();
    submissionAbortRef.current = new AbortController();

    dispatch({ type: "FETCH_SUBMISSIONS_START" });
    try {
      const params: Record<string, unknown> = { page: submissionPage, limit: SUBMISSION_LIMIT };
      if (submissionDebouncedSearch) params.search = submissionDebouncedSearch;
      if (typeFilter !== "All") params.type = typeFilter;
      if (statusFilter !== "All") params.status = statusFilter;

      const response = await axios.get("/api/submissions", {
        params,
        signal: submissionAbortRef.current.signal,
      });
      dispatch({
        type: "FETCH_SUBMISSIONS_SUCCESS",
        submissions: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error ? err.message : "Failed to load submissions";
      toast.error("Failed to load submissions", { description: errorMsg });
      dispatch({ type: "FETCH_SUBMISSIONS_ERROR" });
    }
  }, [submissionPage, submissionDebouncedSearch, typeFilter, statusFilter]);

  useEffect(() => {
    getSubmissions();
  }, [getSubmissions]);

  const getPositions = useCallback(async () => {
    positionAbortRef.current?.abort();
    positionAbortRef.current = new AbortController();

    dispatch({ type: "FETCH_POSITIONS_START" });
    try {
      const params: Record<string, unknown> = {
        page: positionPage,
        limit: POSITION_LIMIT,
        isActive: "all", 
      };
      if (positionDebouncedSearch) params.search = positionDebouncedSearch;

      const response = await axios.get("/api/open-positions", {
        params,
        signal: positionAbortRef.current.signal,
      });
      dispatch({
        type: "FETCH_POSITIONS_SUCCESS",
        positions: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error ? err.message : "Failed to load positions";
      toast.error("Failed to load positions", { description: errorMsg });
      dispatch({ type: "FETCH_POSITIONS_ERROR" });
    }
  }, [positionPage, positionDebouncedSearch]);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const handleTypeChange = useCallback((value: TypeFilter) => dispatch({ type: "SET_TYPE_FILTER", value }), []);
  const handleStatusChange = useCallback((value: StatusFilter) => dispatch({ type: "SET_STATUS_FILTER", value }), []);
  const clearSubmissionFilters = useCallback(() => dispatch({ type: "CLEAR_SUBMISSION_FILTERS" }), []);

  const openDeleteSubmissionModal = useCallback(
    (submission: Submission) => dispatch({ type: "OPEN_DELETE_SUBMISSION", submission }),
    [],
  );
  const closeDeleteSubmissionModal = useCallback(() => dispatch({ type: "CLOSE_DELETE_SUBMISSION" }), []);

  const deleteSubmissionById = useCallback(async () => {
    if (!deleteSubmissionTarget) return;
    dispatch({ type: "DELETE_SUBMISSION_START" });
    try {
      await axios.delete(`/api/submissions/${deleteSubmissionTarget.id}`, { headers: getAuthHeaders() });
      const isLastOnPage = submissions.length === 1 && submissionPage > 1;
      dispatch({ type: "DELETE_SUBMISSION_SUCCESS" });
      if (isLastOnPage) {
        dispatch({ type: "SET_SUBMISSION_PAGE", page: submissionPage - 1 });
      } else {
        getSubmissions();
      }
    } catch (err) {
      console.error("Delete submission failed:", err);
      dispatch({ type: "DELETE_SUBMISSION_ERROR" });
    }
  }, [deleteSubmissionTarget, submissions.length, submissionPage, getSubmissions]);

  const openDeletePositionModal = useCallback(
    (position: OpenPosition) => dispatch({ type: "OPEN_DELETE_POSITION", position }),
    [],
  );
  const closeDeletePositionModal = useCallback(() => dispatch({ type: "CLOSE_DELETE_POSITION" }), []);

  const deletePositionById = useCallback(async () => {
    if (!deletePositionTarget) return;
    dispatch({ type: "DELETE_POSITION_START" });
    try {
      await axios.delete(`/api/open-positions/${deletePositionTarget.id}`, { headers: getAuthHeaders() });
      const isLastOnPage = positions.length === 1 && positionPage > 1;
      dispatch({ type: "DELETE_POSITION_SUCCESS" });
      if (isLastOnPage) {
        dispatch({ type: "SET_POSITION_PAGE", page: positionPage - 1 });
      } else {
        getPositions();
      }
    } catch (err) {
      console.error("Delete position failed:", err);
      dispatch({ type: "DELETE_POSITION_ERROR" });
    }
  }, [deletePositionTarget, positions.length, positionPage, getPositions]);

  const submissionTotalCount = useMemo(() => submissionMeta?.total ?? 0, [submissionMeta]);

  const hasActiveSubmissionFilters = useMemo(
    () => !!submissionDebouncedSearch || typeFilter !== "All" || statusFilter !== "All",
    [submissionDebouncedSearch, typeFilter, statusFilter],
  );

  const submissionStatCards = useMemo(
    () => [
      { id: "All" as const, label: "All", icon: Users },
      { id: "vendor" as const, label: "Vendors", icon: Briefcase },
      { id: "career" as const, label: "Careers", icon: UserCheck },
    ],
    [],
  );

  const getSubmissionName = useCallback(
    (s: Submission) =>
      s.type === "vendor"
        ? (s as VendorSubmission).company_name ?? s.email
        : (s as CareerSubmission).full_name ?? s.email,
    [],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Career &amp; Partnership
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isSubmissionsLoading ? (
              <span className="inline-block w-32 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${submissionTotalCount} total submission${submissionTotalCount !== 1 ? "s" : ""}`
            )}
          </p>
        </div>
      </div>

      
      {isSubmissionsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          
          {submissionStatCards.map((item) => {
            const isActive = typeFilter === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTypeChange(item.id)}
                className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-primary/20 text-primary hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white/70" : "text-primary/50"}`} />
                  <p className={`text-xs tracking-[0.2em] uppercase ${isActive ? "text-white/80" : "text-primary/80"}`}>
                    {item.label}
                  </p>
                </div>
                <p className="text-2xl font-semibold">
                  {item.id === "All"
                    ? submissionTotalCount
                    : isActive
                      ? (submissionMeta?.total ?? "—")
                      : "—"}
                </p>
              </button>
            );
          })}

          
          {(["new", "reviewed", "contacted", "archived"] as SubmissionStatus[]).map((status) => {
            const isActive = statusFilter === status;
            const { label } = submissionStatusConfig[status];
            return (
              <button
                key={status}
                onClick={() => handleStatusChange(isActive ? "All" : status)}
                className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-primary/20 text-primary hover:border-primary/30"
                }`}
              >
                <p className={`text-xs tracking-[0.2em] uppercase mb-1.5 ${isActive ? "text-white/80" : "text-primary/80"}`}>
                  {label}
                </p>
                <p className="text-2xl font-semibold">—</p>
              </button>
            );
          })}
        </div>
      )}

      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-1">Listings</p>
            <h2 className="text-primary text-lg font-semibold tracking-wide">Open Positions</h2>
          </div>
          <Link
            href="/dashboard/career-partnership/positions/new"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Position
          </Link>
        </div>

        
        <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <input
              type="text"
              placeholder="Search positions..."
              value={positionSearch}
              onChange={(e) => dispatch({ type: "SET_POSITION_SEARCH", value: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {positionSearch && (
              <button
                onClick={() => dispatch({ type: "SET_POSITION_SEARCH", value: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary/80 hover:cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        
        {positionDebouncedSearch && !isPositionsLoading && positionMeta && (
          <p className="text-primary/80 text-sm tracking-wider mb-4">
            Showing {positionMeta.total} position{positionMeta.total !== 1 ? "s" : ""}
            {positionDebouncedSearch && ` for "${positionDebouncedSearch}"`}
          </p>
        )}

        
        {isPositionsLoading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {Array.from({ length: POSITION_LIMIT }).map((_, i) => (
              <SkeletonPositionCard key={i} />
            ))}
          </div>
        ) : positions.length === 0 ? (
          <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">No Positions</p>
            <p className="text-primary/60 text-sm mb-5">
              {positionDebouncedSearch
                ? `No positions match "${positionDebouncedSearch}"`
                : "No open positions listed yet."}
            </p>
            {!positionDebouncedSearch && (
              <Link
                href="/dashboard/career-partnership/positions/new"
                className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
              >
                Create First Position
              </Link>
            )}
            {positionDebouncedSearch && (
              <button
                onClick={() => dispatch({ type: "SET_POSITION_SEARCH", value: "" })}
                className="mt-2 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} onDelete={openDeletePositionModal} />
            ))}
          </div>
        )}

        
        {positionMeta && !isPositionsLoading && (
          <Pagination
            meta={positionMeta}
            onPageChange={(page) => dispatch({ type: "SET_POSITION_PAGE", page })}
          />
        )}
      </div>

      
      <div>
        <div className="mb-5">
          <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-1">Inbox</p>
          <h2 className="text-primary text-lg font-semibold tracking-wide">Submissions</h2>
        </div>

        
        <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <input
              type="text"
              placeholder="Search by name, company, position, or email..."
              value={submissionSearch}
              onChange={(e) => dispatch({ type: "SET_SUBMISSION_SEARCH", value: e.target.value })}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {submissionSearch && (
              <button
                onClick={() => dispatch({ type: "SET_SUBMISSION_SEARCH", value: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary/80 hover:cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          
          <div className="relative shrink-0">
            <select
              value={typeFilter}
              onChange={(e) => handleTypeChange(e.target.value as TypeFilter)}
              className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40"
            >
              <option value="All">All Types</option>
              <option value="vendor">Vendor</option>
              <option value="career">Career</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
          </div>

          
          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value as StatusFilter)}
              className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40"
            >
              <option value="All">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
          </div>

          
          {hasActiveSubmissionFilters && (
            <>
              <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />
              <button
                onClick={clearSubmissionFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-sm tracking-widest uppercase text-primary/50 hover:text-primary transition-colors whitespace-nowrap hover:cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>

        
        {hasActiveSubmissionFilters && !isSubmissionsLoading && submissionMeta && (
          <p className="text-primary/80 text-sm tracking-wider mb-4">
            Showing {submissionMeta.total} submission{submissionMeta.total !== 1 ? "s" : ""}
            {typeFilter !== "All" && ` · ${typeFilter}`}
            {statusFilter !== "All" && ` · ${submissionStatusConfig[statusFilter].label}`}
            {submissionDebouncedSearch && ` · "${submissionDebouncedSearch}"`}
          </p>
        )}

        
        {isSubmissionsLoading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: SUBMISSION_LIMIT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
            <Users className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">No Results</p>
            <p className="text-primary/80 text-sm">
              {submissionDebouncedSearch
                ? `No submissions match "${submissionDebouncedSearch}"`
                : "No submissions in this filter yet"}
            </p>
            {hasActiveSubmissionFilters && (
              <button
                onClick={clearSubmissionFilters}
                className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} onDelete={openDeleteSubmissionModal} />
            ))}
          </div>
        )}

        
        {submissionMeta && !isSubmissionsLoading && (
          <Pagination
            meta={submissionMeta}
            onPageChange={(page) => dispatch({ type: "SET_SUBMISSION_PAGE", page })}
          />
        )}
      </div>

      
      {(deleteSubmissionStatus === "confirm" || deleteSubmissionStatus === "deleting") &&
        deleteSubmissionTarget && (
          <DeleteModal
            name={getSubmissionName(deleteSubmissionTarget)}
            onConfirm={deleteSubmissionById}
            onCancel={closeDeleteSubmissionModal}
            isLoading={deleteSubmissionStatus === "deleting"}
          />
        )}

      
      {(deletePositionStatus === "confirm" || deletePositionStatus === "deleting") &&
        deletePositionTarget && (
          <DeleteModal
            name={deletePositionTarget.title}
            onConfirm={deletePositionById}
            onCancel={closeDeletePositionModal}
            isLoading={deletePositionStatus === "deleting"}
          />
        )}
    </div>
  );
}