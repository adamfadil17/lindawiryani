"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCircle2,
} from "lucide-react";
import { User, Role } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const LIMIT = 10;

type RoleFilter = "all" | Role;

function SkeletonRow() {
  return (
    <tr className="border-b border-primary/10 animate-pulse">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-primary/10 rounded" />
            <div className="h-3 w-48 bg-primary/10 rounded" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-16 bg-primary/10 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-24 bg-primary/10 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="flex gap-1 justify-end">
          <div className="w-8 h-8 bg-primary/10 rounded" />
          <div className="w-8 h-8 bg-primary/10 rounded" />
        </div>
      </td>
    </tr>
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

const roleBadgeClass: Record<Role, string> = {
  admin: "bg-violet-50 text-violet-700 border border-violet-200",
  editor: "bg-amber-50 text-amber-700 border border-amber-200",
  user: "bg-primary/5 text-primary/60 border border-primary/15",
};

function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs tracking-widest uppercase px-2.5 py-0.5 font-medium ${roleBadgeClass[role]}`}
    >
      {role === "admin" && <ShieldCheck className="w-3 h-3" />}
      {role}
    </span>
  );
}

function UserRow({
  user,
  onDelete,
}: {
  user: User;
  onDelete: (user: User) => void;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="border-b border-primary/10 hover:bg-primary/[0.02] transition-colors group">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-[10px] tracking-widest font-semibold text-primary/60">
              {initials}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-primary leading-snug">
              {user.name}
            </p>
            <p className="text-xs text-primary/50 mt-0.5">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <RoleBadge role={user.role} />
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-primary/50 tracking-wider">
          {formattedDate}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/dashboard/users/${user.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 transition-colors"
            title="Edit User"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onDelete(user)}
            className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-red-500 hover:bg-red-50 transition-colors hover:cursor-pointer"
            title="Delete User"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  const isActive = value !== "all";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none h-full pl-3 pr-8 py-2.5 text-sm tracking-widest border focus:outline-none focus:border-primary/50 transition-colors cursor-pointer ${
          isActive
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary/60 border-primary/20 hover:border-primary/40 hover:text-primary/80"
        }`}
      >
        {options.map((opt) => (
          <option
            key={opt.id}
            value={opt.id}
            className="bg-white text-primary normal-case font-normal tracking-normal"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
          isActive ? "text-white/70" : "text-primary/40"
        }`}
      />
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
    <div className="flex items-center justify-between mt-6 pt-5 border-t border-primary/20">
      <p className="text-primary/60 text-xs tracking-wider">
        Showing{" "}
        <span className="text-primary font-medium">
          {(meta.page - 1) * meta.limit + 1}–
          {Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="text-primary font-medium">{meta.total}</span> users
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrev}
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
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
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface PageState {
  users: User[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;

  searchTerm: string;
  debouncedSearch: string;
  roleFilter: RoleFilter;
  currentPage: number;

  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: User | null;

  roleCounts: Partial<Record<RoleFilter, number>>;
  isCountsLoading: boolean;
}

type PageAction =
  | { type: "FETCH_USERS_START" }
  | { type: "FETCH_USERS_SUCCESS"; users: User[]; meta: PaginationMeta | null }
  | { type: "FETCH_USERS_ERROR" }
  | { type: "SET_ROLE_COUNTS"; counts: Partial<Record<RoleFilter, number>> }
  | { type: "COUNTS_LOADED" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_ROLE"; role: RoleFilter }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_FILTERS" }
  | { type: "OPEN_DELETE"; user: User }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  users: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  roleFilter: "all",
  currentPage: 1,
  deleteStatus: "idle",
  deleteTarget: null,
  roleCounts: {},
  isCountsLoading: true,
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, isLoading: true };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        users: action.users,
        paginationMeta: action.meta,
      };
    case "FETCH_USERS_ERROR":
      return { ...state, isLoading: false };
    case "SET_ROLE_COUNTS":
      return {
        ...state,
        roleCounts: { ...state.roleCounts, ...action.counts },
      };
    case "COUNTS_LOADED":
      return { ...state, isCountsLoading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.value };
    case "SET_DEBOUNCED_SEARCH":
      return { ...state, debouncedSearch: action.value, currentPage: 1 };
    case "SET_ROLE":
      return { ...state, roleFilter: action.role, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "CLEAR_FILTERS":
      return { ...state, searchTerm: "", roleFilter: "all", currentPage: 1 };
    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.user, deleteStatus: "confirm" };
    case "CLOSE_DELETE":
      return state.deleteStatus === "deleting"
        ? state
        : { ...state, deleteTarget: null, deleteStatus: "idle" };
    case "DELETE_START":
      return { ...state, deleteStatus: "deleting" };
    case "DELETE_SUCCESS":
      return { ...state, deleteTarget: null, deleteStatus: "idle" };
    case "DELETE_ERROR":
      return { ...state, deleteStatus: "confirm" };
    default:
      return state;
  }
}

export default function DashboardUsersPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    users,
    paginationMeta,
    isLoading,
    searchTerm,
    debouncedSearch,
    roleFilter,
    currentPage,
    deleteStatus,
    deleteTarget,
    roleCounts,
    isCountsLoading,
  } = state;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: searchTerm });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchCounts = async () => {
      const roles: Role[] = ["admin", "editor", "user"];
      try {
        const results = await Promise.allSettled(
          roles.map((role) =>
            axios
              .get<{ meta: PaginationMeta }>("/api/users", {
                params: { page: 1, limit: 1, role },
                headers: getAuthHeaders(),
              })
              .then((res) => ({ role, total: res.data.meta?.total ?? 0 })),
          ),
        );

        const counts: Partial<Record<RoleFilter, number>> = {};
        for (const result of results) {
          if (result.status === "fulfilled") {
            counts[result.value.role] = result.value.total;
          }
        }
        dispatch({ type: "SET_ROLE_COUNTS", counts });
      } catch (err) {
        console.error("Failed to load role counts:", err);
      } finally {
        dispatch({ type: "COUNTS_LOADED" });
      }
    };
    fetchCounts();
  }, []);

  const getUsers = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_USERS_START" });
    try {
      const params: Record<string, unknown> = {
        page: currentPage,
        limit: LIMIT,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (roleFilter !== "all") params.role = roleFilter;

      const response = await axios.get("/api/users", {
        params,
        headers: getAuthHeaders(),
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_USERS_SUCCESS",
        users: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load users";
      toast.error("Failed to load users", { description: errorMsg });
      dispatch({ type: "FETCH_USERS_ERROR" });
    }
  }, [currentPage, debouncedSearch, roleFilter]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleRoleChange = useCallback(
    (role: string) => dispatch({ type: "SET_ROLE", role: role as RoleFilter }),
    [],
  );
  const clearAllFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    [],
  );

  const openDeleteModal = useCallback(
    (user: User) => dispatch({ type: "OPEN_DELETE", user }),
    [],
  );
  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deleteUserById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/users/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      const isLastOnPage = users.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success(`${deleteTarget.name} has been removed.`);
      if (isLastOnPage) {
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getUsers();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete user.");
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, users.length, currentPage, getUsers]);

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  const hasActiveFilters = useMemo(
    () => !!debouncedSearch || roleFilter !== "all",
    [debouncedSearch, roleFilter],
  );

  const roleOptions = useMemo(
    () => [
      { id: "all", label: "All Roles" },
      { id: "admin", label: "Admin" },
      { id: "editor", label: "Editor" },
      { id: "user", label: "User" },
    ],
    [],
  );

  const statCards = useMemo(
    () => [
      { id: "all" as RoleFilter, label: "Total" },
      { id: "admin" as RoleFilter, label: "Admin" },
      { id: "editor" as RoleFilter, label: "Editor" },
      { id: "user" as RoleFilter, label: "User" },
    ],
    [],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Users
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} registered users`
            )}
          </p>
        </div>

        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      {isCountsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => {
            const isActive = roleFilter === stat.id;
            const displayValue =
              stat.id === "all" ? totalCount : (roleCounts[stat.id] ?? "—");

            return (
              <button
                key={stat.id}
                onClick={() => handleRoleChange(stat.id)}
                className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-primary/20 text-primary hover:border-primary/30"
                }`}
              >
                <p
                  className={`text-xs tracking-[0.2em] uppercase mb-1.5 truncate ${
                    isActive ? "text-white/80" : "text-primary/80"
                  }`}
                >
                  {stat.label}
                </p>
                {isLoading && stat.id === "all" ? (
                  <div className="h-7 w-10 bg-current opacity-10 animate-pulse rounded" />
                ) : (
                  <p className="text-2xl font-semibold">{displayValue}</p>
                )}
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", value: e.target.value })
            }
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors hover:cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        <div className="flex gap-2 items-stretch h-[42px]">
          <FilterDropdown
            value={roleFilter}
            onChange={handleRoleChange}
            options={roleOptions}
          />
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
          Showing {paginationMeta.total} user
          {paginationMeta.total !== 1 ? "s" : ""}
          {roleFilter !== "all" &&
            ` with role "${roleOptions.find((r) => r.id === roleFilter)?.label ?? ""}"`}
          {debouncedSearch && ` matching "${debouncedSearch}"`}
        </p>
      )}

      <div className="bg-white border border-primary/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20 bg-primary/[0.02]">
              <th className="px-5 py-3 text-left text-xs tracking-[0.2em] uppercase text-primary/50 font-medium">
                User
              </th>
              <th className="px-5 py-3 text-left text-xs tracking-[0.2em] uppercase text-primary/50 font-medium">
                Role
              </th>
              <th className="px-5 py-3 text-left text-xs tracking-[0.2em] uppercase text-primary/50 font-medium">
                Joined
              </th>
              <th className="px-5 py-3 text-right text-xs tracking-[0.2em] uppercase text-primary/50 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: LIMIT }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <UserCircle2 className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
                      No Results
                    </p>
                    <p className="text-primary/80 text-sm">
                      {debouncedSearch
                        ? `No users match "${debouncedSearch}"`
                        : "No users in this filter yet"}
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
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow key={user.id} user={user} onDelete={openDeleteModal} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginationMeta && !isLoading && (
        <Pagination
          meta={paginationMeta}
          onPageChange={(page) => dispatch({ type: "SET_PAGE", page })}
        />
      )}

      {(deleteStatus === "confirm" || deleteStatus === "deleting") &&
        deleteTarget && (
          <DeleteModal
            name={deleteTarget.name}
            onConfirm={deleteUserById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}
