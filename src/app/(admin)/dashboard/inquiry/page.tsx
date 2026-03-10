"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
  Eye,
  Trash2,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Heart,
  Filter,
} from "lucide-react";
import { Inquiry, InquiryStatus, inquiryStatusConfig, InquirySubmission } from "@/lib/types/new-strucutre";



// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockInquiries: InquirySubmission[] = [
  {
    id: "inq-001",
    status: "new",
    submittedAt: "2025-01-20T09:15:00Z",
    yourName: "Emma Richardson",
    yourEmail: "emma.richardson@gmail.com",
    yourAddress: "London, United Kingdom",
    telephone: "+44 7911 123456",
    nameOfGroom: "James Richardson",
    religionOfGroom: "Christian",
    nationalityOfGroom: "British",
    nameOfBride: "Emma Clarke",
    religionOfBride: "Christian",
    nationalityOfBride: "British",
    weddingDate: "2025-10-15",
    weddingVenue: "Tirtha Uluwatu",
    numberOfAttendance: "40",
    approximateWeddingBudget: "$25,000 – $35,000",
    hotelNameInBali: "The Mulia Resort",
    arrivalDate: "2025-10-12",
    departureDate: "2025-10-20",
    yourMessage:
      "We've been dreaming of a cliffside sunset ceremony in Bali for years. We'd love an intimate elopement-style wedding with just our closest family and friends. Hoping for elegant, natural floral arrangements and a private dinner reception.",
  },
  {
    id: "inq-002",
    status: "reviewed",
    submittedAt: "2025-01-19T14:30:00Z",
    yourName: "Mei Lin Zhang",
    yourEmail: "meilin.zhang@outlook.com",
    yourAddress: "Singapore",
    telephone: "+65 9123 4567",
    nameOfGroom: "Wei Zhang",
    religionOfGroom: "Buddhist",
    nationalityOfGroom: "Singaporean",
    nameOfBride: "Mei Lin Tan",
    religionOfBride: "Buddhist",
    nationalityOfBride: "Singaporean",
    weddingDate: "2025-09-20",
    weddingVenue: "Mandapa Reserve Ubud",
    numberOfAttendance: "80",
    approximateWeddingBudget: "$40,000 – $60,000",
    hotelNameInBali: "Mandapa, a Ritz-Carlton Reserve",
    arrivalDate: "2025-09-17",
    departureDate: "2025-09-25",
    yourMessage:
      "We are looking for a luxury jungle-themed wedding in Ubud with traditional Balinese ceremonial elements blended with modern aesthetics. We'd also appreciate assistance with accommodation for our guests.",
  },
  {
    id: "inq-003",
    status: "quoted",
    submittedAt: "2025-01-17T11:00:00Z",
    yourName: "Sophie Moreau",
    yourEmail: "sophie.moreau@icloud.com",
    yourAddress: "Paris, France",
    telephone: "+33 6 12 34 56 78",
    nameOfGroom: "Lucas Moreau",
    religionOfGroom: "Catholic",
    nationalityOfGroom: "French",
    nameOfBride: "Sophie Dupont",
    religionOfBride: "Catholic",
    nationalityOfBride: "French",
    weddingDate: "2025-12-05",
    weddingVenue: "Semara Luxury Villa Resort",
    numberOfAttendance: "20",
    approximateWeddingBudget: "$15,000 – $20,000",
    hotelNameInBali: "COMO Uma Canggu",
    arrivalDate: "2025-12-02",
    departureDate: "2025-12-10",
    yourMessage:
      "Just the two of us and our families — a true elopement with a romantic sunset ceremony. We love the idea of a private villa setting with candlelit dinner. French-inspired floral design if possible.",
  },
  {
    id: "inq-004",
    status: "booked",
    submittedAt: "2025-01-15T08:45:00Z",
    yourName: "Priya Nair",
    yourEmail: "priya.nair@email.com",
    yourAddress: "Mumbai, India",
    telephone: "+91 98765 43210",
    nameOfGroom: "Arjun Mehta",
    religionOfGroom: "Hindu",
    nationalityOfGroom: "Indian",
    nameOfBride: "Priya Nair",
    religionOfBride: "Hindu",
    nationalityOfBride: "Indian",
    weddingDate: "2025-08-10",
    weddingVenue: "Alila Villas Uluwatu",
    numberOfAttendance: "120",
    approximateWeddingBudget: "$60,000 – $80,000",
    hotelNameInBali: "Alila Villas Uluwatu",
    arrivalDate: "2025-08-06",
    departureDate: "2025-08-15",
    yourMessage:
      "We are planning a multi-day celebration blending traditional Hindu rituals with a modern destination wedding. We need coordination for Mehendi, Sangeet, and the main ceremony. Our families will be flying in from Mumbai and London.",
  },
  {
    id: "inq-005",
    status: "new",
    submittedAt: "2025-01-14T16:20:00Z",
    yourName: "Hannah Müller",
    yourEmail: "h.mueller@gmail.com",
    yourAddress: "Berlin, Germany",
    telephone: "+49 151 23456789",
    nameOfGroom: "Tobias Müller",
    religionOfGroom: "Non-religious",
    nationalityOfGroom: "German",
    nameOfBride: "Hannah Schmidt",
    religionOfBride: "Non-religious",
    nationalityOfBride: "German",
    weddingDate: "2026-03-22",
    weddingVenue: "Komaneka at Bisma",
    numberOfAttendance: "30",
    approximateWeddingBudget: "$20,000 – $30,000",
    hotelNameInBali: "Komaneka at Bisma",
    arrivalDate: "2026-03-19",
    departureDate: "2026-03-28",
    yourMessage:
      "We love Ubud's serene atmosphere and rice terrace scenery. We'd love a minimalist, nature-forward aesthetic — think organic textures, wild greenery, and earthy tones. Small gathering of close friends.",
  },
  {
    id: "inq-006",
    status: "archived",
    submittedAt: "2025-01-10T10:00:00Z",
    yourName: "Olivia Thompson",
    yourEmail: "olivia.t@yahoo.com",
    yourAddress: "Sydney, Australia",
    telephone: "+61 412 345 678",
    nameOfGroom: "Nathan Thompson",
    religionOfGroom: "Christian",
    nationalityOfGroom: "Australian",
    nameOfBride: "Olivia Davis",
    religionOfBride: "Christian",
    nationalityOfBride: "Australian",
    weddingDate: "2025-07-04",
    weddingVenue: "Four Seasons Resort Bali at Sayan",
    numberOfAttendance: "60",
    approximateWeddingBudget: "$35,000 – $50,000",
    hotelNameInBali: "Four Seasons Resort Bali at Sayan",
    arrivalDate: "2025-07-01",
    departureDate: "2025-07-08",
    yourMessage:
      "Dreaming of a lush jungle riverside ceremony — something truly magical and otherworldly. We'd love help with logistics for guests travelling from Australia and New Zealand.",
  },
];

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
          Delete Inquiry
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete the inquiry from{" "}
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

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: InquiryStatus }) {
  const { label, classes } = inquiryStatusConfig[status];
  return (
    <span
      className={`text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

// ─── Inquiry Card ─────────────────────────────────────────────────────────────

function InquiryCard({
  inquiry,
  onDelete,
}: {
  inquiry: InquirySubmission;
  onDelete: (inquiry: InquirySubmission) => void;
}) {
  const submittedDate = new Date(inquiry.submittedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  const weddingDateFormatted = inquiry.weddingDate
    ? new Date(inquiry.weddingDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-white border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md group p-5">
      {/* Top row */}
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
              {inquiry.nameOfBride} & {inquiry.nameOfGroom}
            </h3>
            <p className="text-primary/60 text-xs tracking-wider mt-0.5 truncate">
              {inquiry.yourName}
            </p>
          </div>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">
            {inquiry.yourEmail}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs">{inquiry.telephone}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs truncate">
            {inquiry.weddingVenue}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3 text-primary/40 flex-shrink-0" />
          <span className="text-primary/70 text-xs">{weddingDateFormatted}</span>
        </div>
      </div>

      {/* Guest & Budget pills */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs tracking-wider text-primary/60 bg-primary/5 border border-primary/10 px-2.5 py-1">
          {inquiry.numberOfAttendance} guests
        </span>
        <span className="text-xs tracking-wider text-primary/60 bg-primary/5 border border-primary/10 px-2.5 py-1 truncate max-w-[160px]">
          {inquiry.approximateWeddingBudget}
        </span>
      </div>

      {/* Footer */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InquiryPage() {
  const [inquiries, setInquiries] =
    useState<InquirySubmission[]>(mockInquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | InquiryStatus>(
    "All"
  );
  const [deleteTarget, setDeleteTarget] = useState<InquirySubmission | null>(
    null
  );

  const filtered = inquiries.filter((inq) => {
    const coupleName = `${inq.nameOfBride} ${inq.nameOfGroom}`.toLowerCase();
    const matchSearch =
      coupleName.includes(search.toLowerCase()) ||
      inq.yourName.toLowerCase().includes(search.toLowerCase()) ||
      inq.yourEmail.toLowerCase().includes(search.toLowerCase()) ||
      inq.weddingVenue.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const countByStatus = (status: InquiryStatus) =>
    inquiries.filter((inq) => inq.status === status).length;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Inquiries
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {inquiries.length} total inquiries
          </p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/* All */}
        <button
          onClick={() => setStatusFilter("All")}
          className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
            statusFilter === "All"
              ? "bg-primary text-white border-primary"
              : "bg-white border-primary/20 text-primary hover:border-primary/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Users
              className={`w-3.5 h-3.5 ${statusFilter === "All" ? "text-white/70" : "text-primary/50"}`}
            />
            <p
              className={`text-xs tracking-[0.2em] uppercase ${
                statusFilter === "All" ? "text-white/80" : "text-primary/80"
              }`}
            >
              All
            </p>
          </div>
          <p className="text-2xl font-semibold">{inquiries.length}</p>
        </button>

        {/* Status stat buttons */}
        {(
          [
            "new",
            "reviewed",
            "quoted",
            "booked",
            "archived",
          ] as InquiryStatus[]
        ).map((status) => {
          const isActive = statusFilter === status;
          const { label } = inquiryStatusConfig[status];
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

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search by couple name, contact, venue, or email..."
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

        {/* Status filter */}
        <div className="relative shrink-0">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "All" | InquiryStatus)
            }
            className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="quoted">Quoted</option>
            <option value="booked">Booked</option>
            <option value="archived">Archived</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>
      </div>

      {/* ── Results Count ── */}
      {(search || statusFilter !== "All") && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {filtered.length} of {inquiries.length} inquiries
          {statusFilter !== "All" &&
            ` · ${inquiryStatusConfig[statusFilter].label}`}
          {search && ` · "${search}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Heart className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search
              ? `No inquiries match "${search}"`
              : "No inquiries in this category yet"}
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
          {filtered.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onDelete={(inq) => setDeleteTarget(inq)}
            />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          name={`${deleteTarget.nameOfBride} & ${deleteTarget.nameOfGroom}`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}