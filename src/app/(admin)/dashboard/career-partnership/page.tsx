"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
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
  MapPin,
  Layers,
} from "lucide-react";
import {
  Vendor,
  Career,
  SubmissionType,
  SubmissionStatus,
  VendorSubmission,
  CareerSubmission,
  Submission,
  submissionStatusConfig,
  OpenPosition,
  openPositions,
} from "@/lib/types/new-strucutre";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockSubmissions: Submission[] = [
  {
    id: "sub-001",
    type: "vendor",
    status: "new",
    submittedAt: "2025-01-15T09:30:00Z",
    companyName: "Bloom & Petal Florals",
    contactPerson: "Sari Dewi",
    email: "sari@bloomandpetal.com",
    phone: "+62 812-3456-7890",
    website: "https://bloomandpetal.com",
    vendorCategory: "Florist",
    yearsInBusiness: "8",
    portfolioLink: "https://bloomandpetal.com/portfolio",
    message:
      "We specialize in tropical and Balinese floral arrangements for luxury weddings. Our team has worked with over 200 couples across Bali and Lombok.",
  },
  {
    id: "sub-002",
    type: "career",
    status: "reviewed",
    submittedAt: "2025-01-14T14:20:00Z",
    fullName: "Rizky Pratama",
    email: "rizky.pratama@gmail.com",
    phone: "+62 821-9876-5432",
    position: "Senior Wedding Planner",
    experience: "6 years",
    linkedIn: "https://linkedin.com/in/rizkypratama",
    portfolioLink: "https://rizkypratama.notion.site",
    coverLetter:
      "I have been passionate about creating unforgettable wedding experiences for the past 6 years, with specialization in destination weddings across Southeast Asia.",
  },
  {
    id: "sub-003",
    type: "vendor",
    status: "contacted",
    submittedAt: "2025-01-13T11:00:00Z",
    companyName: "Cinematic Vows",
    contactPerson: "Budi Santoso",
    email: "hello@cinematicvows.id",
    phone: "+62 818-5555-1234",
    website: "https://cinematicvows.id",
    vendorCategory: "Videography",
    yearsInBusiness: "5",
    portfolioLink: "https://vimeo.com/cinematicvows",
    message:
      "Award-winning wedding film studio based in Seminyak. We craft timeless cinematic stories for couples from around the world.",
  },
  {
    id: "sub-004",
    type: "career",
    status: "new",
    submittedAt: "2025-01-12T08:45:00Z",
    fullName: "Ayu Maharani",
    email: "ayu.maharani@email.com",
    phone: "+62 857-1234-5678",
    position: "Event Coordinator",
    experience: "3 years",
    linkedIn: "https://linkedin.com/in/ayumaharani",
    portfolioLink: "",
    coverLetter:
      "Detail-oriented event coordinator with experience in luxury hospitality. Looking to bring my organizational skills to a world-class wedding company.",
  },
  {
    id: "sub-005",
    type: "vendor",
    status: "archived",
    submittedAt: "2025-01-10T16:15:00Z",
    companyName: "Bali Photo Art",
    contactPerson: "Made Suryawan",
    email: "made@baliphotoart.com",
    phone: "+62 811-9999-0000",
    website: "https://baliphotoart.com",
    vendorCategory: "Photography",
    yearsInBusiness: "12",
    portfolioLink: "https://baliphotoart.com/gallery",
    message:
      "Fine art wedding photography with 12 years of experience in Bali. Our work has been featured in Vogue Weddings and Harper's Bazaar.",
  },
  {
    id: "sub-006",
    type: "career",
    status: "contacted",
    submittedAt: "2025-01-09T10:30:00Z",
    fullName: "Dian Kusuma",
    email: "dian.kusuma@outlook.com",
    phone: "+62 896-7654-3210",
    position: "Wedding Stylist",
    experience: "4 years",
    linkedIn: "https://linkedin.com/in/diankusuma",
    portfolioLink: "https://diankusuma.com",
    coverLetter:
      "Passionate wedding stylist with expertise in contemporary Balinese and minimalist aesthetics. Previously worked with The Ritz-Carlton Bali.",
  },
];

// ─── Mock Open Positions (with IDs) ──────────────────────────────────────────

const mockPositions: OpenPosition[] = openPositions.map((p, i) => ({
  ...p,
  id: `pos-00${i + 1}`,
}));

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-6">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Submission
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete the submission from{" "}
          <span className="font-semibold text-primary">
            &ldquo;{name}&rdquo;
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Position Modal ────────────────────────────────────────────────────

function DeletePositionModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-6">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Position
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete the position{" "}
          <span className="font-semibold text-primary">
            &ldquo;{title}&rdquo;
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const { label, classes } = submissionStatusConfig[status];
  return (
    <span
      className={`text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

// ─── Open Position Card ───────────────────────────────────────────────────────

function PositionCard({
  position,
  onDelete,
}: {
  position: OpenPosition;
  onDelete: (position: OpenPosition) => void;
}) {
  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5 bg-primary/5">
            <Briefcase className="w-4 h-4 text-primary/50" />
          </div>
          <div className="min-w-0">
            <h3 className="text-primary font-semibold text-base leading-snug">
              {position.title}
            </h3>
            <p className="text-primary/50 text-xs tracking-wider mt-0.5">
              {position.type}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/5 text-primary/60 border border-primary/10">
          {position.level}
        </span>
      </div>

      {/* Description */}
      <p className="text-primary/70 text-sm leading-relaxed line-clamp-2 mb-4">
        {position.desc}
      </p>

      {/* Footer */}
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
            <Eye className="w-4 h-4" />
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

// ─── Submission Card ──────────────────────────────────────────────────────────

function SubmissionCard({
  submission,
  onDelete,
}: {
  submission: Submission;
  onDelete: (submission: Submission) => void;
}) {
  const isVendor = submission.type === "vendor";
  const name = isVendor
    ? (submission as VendorSubmission).companyName
    : (submission as CareerSubmission).fullName;
  const subLabel = isVendor
    ? (submission as VendorSubmission).vendorCategory
    : (submission as CareerSubmission).position;
  const email = isVendor
    ? (submission as VendorSubmission).email
    : (submission as CareerSubmission).email;
  const phone = isVendor
    ? (submission as VendorSubmission).phone
    : (submission as CareerSubmission).phone;
  const website = isVendor
    ? (submission as VendorSubmission).website
    : (submission as CareerSubmission).linkedIn;
  const submittedDate = new Date(submission.submittedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );

  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5 ${
              isVendor ? "bg-primary/10" : "bg-amber-50"
            }`}
          >
            {isVendor ? (
              <Briefcase className="w-4 h-4 text-primary/60" />
            ) : (
              <UserCheck className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="min-w-0">
            <p
              className={`text-xs tracking-widest uppercase mb-0.5 ${
                isVendor ? "text-primary/50" : "text-amber-500/80"
              }`}
            >
              {isVendor ? "Vendor" : "Career"}
            </p>
            <h3 className="text-primary font-semibold text-base leading-snug truncate">
              {name}
            </h3>
            <p className="text-primary/60 text-xs tracking-wider mt-0.5">
              {subLabel}
            </p>
          </div>
        </div>
        <StatusBadge status={submission.status} />
      </div>

      {/* Contact info */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">{email}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs">{phone}</span>
        </div>
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

      {/* Footer */}
      <div className="border-t border-primary/10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-primary/30" />
          <span className="text-primary/40 text-xs">{submittedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/career-partnership/${submission.id}`}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareerPartnershipPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [positions, setPositions] = useState<OpenPosition[]>(mockPositions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | SubmissionType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | SubmissionStatus>(
    "All",
  );
  const [deleteTarget, setDeleteTarget] = useState<Submission | null>(null);
  const [deletePositionTarget, setDeletePositionTarget] =
    useState<OpenPosition | null>(null);

  const filtered = submissions.filter((s) => {
    const name =
      s.type === "vendor"
        ? (s as VendorSubmission).companyName
        : (s as CareerSubmission).fullName;
    const sub =
      s.type === "vendor"
        ? (s as VendorSubmission).vendorCategory
        : (s as CareerSubmission).position;
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      sub.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || s.type === typeFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const confirmDeletePosition = () => {
    if (deletePositionTarget) {
      setPositions((prev) =>
        prev.filter((p) => p.id !== deletePositionTarget.id),
      );
      setDeletePositionTarget(null);
    }
  };

  const countByType = (type: SubmissionType) =>
    submissions.filter((s) => s.type === type).length;
  const countByStatus = (status: SubmissionStatus) =>
    submissions.filter((s) => s.status === status).length;

  const deleteTargetName = deleteTarget
    ? deleteTarget.type === "vendor"
      ? (deleteTarget as VendorSubmission).companyName
      : (deleteTarget as CareerSubmission).fullName
    : "";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Career & Partnership
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {submissions.length} total submissions
          </p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/* Type stats */}
        {(
          [
            {
              id: "All" as const,
              label: "All",
              value: submissions.length,
              icon: Users,
            },
            {
              id: "vendor" as const,
              label: "Vendors",
              value: countByType("vendor"),
              icon: Briefcase,
            },
            {
              id: "career" as const,
              label: "Careers",
              value: countByType("career"),
              icon: UserCheck,
            },
          ] as const
        ).map((item) => {
          const isActive = typeFilter === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setTypeFilter(item.id)}
              className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-primary/20 text-primary hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-white/70" : "text-primary/50"}`}
                />
                <p
                  className={`text-xs tracking-[0.2em] uppercase ${
                    isActive ? "text-white/80" : "text-primary/80"
                  }`}
                >
                  {item.label}
                </p>
              </div>
              <p className="text-2xl font-semibold">{item.value}</p>
            </button>
          );
        })}

        {/* Status stats */}
        {(
          ["new", "reviewed", "contacted", "archived"] as SubmissionStatus[]
        ).map((status) => {
          const isActive = statusFilter === status;
          const { label, classes } = submissionStatusConfig[status];
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(isActive ? "All" : status)}
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
              <p className="text-2xl font-semibold">{countByStatus(status)}</p>
            </button>
          );
        })}
      </div>

      {/* ── Open Positions Section ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-1">
              Listings
            </p>
            <h2 className="text-primary text-lg font-semibold tracking-wide">
              Open Positions
            </h2>
          </div>
          <Link
            href="/dashboard/career-partnership/positions/new"
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Position
          </Link>
        </div>

        {positions.length === 0 ? (
          <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
              No Positions
            </p>
            <p className="text-primary/60 text-sm mb-5">
              No open positions listed yet.
            </p>
            <Link
              href="/dashboard/career-partnership/positions/new"
              className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
            >
              Create First Position
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {positions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                onDelete={(p) => setDeletePositionTarget(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Submissions Section ── */}
      <div>
        <div className="mb-5">
          <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-1">
            Inbox
          </p>
          <h2 className="text-primary text-lg font-semibold tracking-wide">
            Submissions
          </h2>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <input
              type="text"
              placeholder="Search by name, category, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary/80 hover:cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="relative shrink-0">
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "All" | SubmissionType)
              }
              className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="vendor">Vendor</option>
              <option value="career">Career</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
          </div>

          {/* Status filter */}
          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | SubmissionStatus)
              }
              className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
          </div>
        </div>

        {/* ── Results Count ── */}
        {(search || typeFilter !== "All" || statusFilter !== "All") && (
          <p className="text-primary/80 text-sm tracking-wider mb-4">
            Showing {filtered.length} of {submissions.length} submissions
            {typeFilter !== "All" && ` · ${typeFilter}`}
            {statusFilter !== "All" &&
              ` · ${submissionStatusConfig[statusFilter].label}`}
            {search && ` · "${search}"`}
          </p>
        )}

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
            <Users className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
              No Results
            </p>
            <p className="text-primary/80 text-sm">
              {search
                ? `No submissions match "${search}"`
                : "No submissions in this category yet"}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onDelete={(s) => setDeleteTarget(s)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Delete Submission Modal ── */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTargetName}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Delete Position Modal ── */}
      {deletePositionTarget && (
        <DeletePositionModal
          title={deletePositionTarget.title}
          onConfirm={confirmDeletePosition}
          onCancel={() => setDeletePositionTarget(null)}
        />
      )}
    </div>
  );
}
