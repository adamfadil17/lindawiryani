"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Mail,
  Phone,
  Clock,
  CalendarDays,
  MapPin,
  Users,
  MessageSquare,
  ChevronDown,
  Trash2,
  X,
  AlertCircle,
  Globe,
  Hotel,
  Plane,
  DollarSign,
  User,
  Flag,
  BookOpen,
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

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-primary/10 last:border-0">
      <div className="w-8 h-8 flex items-center justify-center bg-primary/5 flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-primary/50" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-medium hover:text-primary/70 underline underline-offset-2 transition-colors break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-primary text-sm font-medium break-all">{value}</p>
        )}
      </div>
    </div>
  );
}

// ─── Section Block ────────────────────────────────────────────────────────────

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-primary/20 p-6">
      <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── Couple Row ───────────────────────────────────────────────────────────────

function CoupleColumn({
  role,
  name,
  religion,
  nationality,
}: {
  role: "Bride" | "Groom";
  name: string;
  religion: string;
  nationality: string;
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-primary/40 text-xs tracking-widest uppercase mb-3">
        {role}
      </p>
      <div className="space-y-0">
        <div className="flex items-start gap-3 py-2.5 border-b border-primary/10">
          <div className="w-7 h-7 flex items-center justify-center bg-primary/5 flex-shrink-0">
            <User className="w-3 h-3 text-primary/50" />
          </div>
          <div>
            <p className="text-primary/50 text-xs tracking-widest uppercase mb-0.5">
              Full Name
            </p>
            <p className="text-primary text-sm font-medium">{name}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-2.5 border-b border-primary/10">
          <div className="w-7 h-7 flex items-center justify-center bg-primary/5 flex-shrink-0">
            <BookOpen className="w-3 h-3 text-primary/50" />
          </div>
          <div>
            <p className="text-primary/50 text-xs tracking-widest uppercase mb-0.5">
              Religion
            </p>
            <p className="text-primary text-sm font-medium">{religion}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-2.5">
          <div className="w-7 h-7 flex items-center justify-center bg-primary/5 flex-shrink-0">
            <Flag className="w-3 h-3 text-primary/50" />
          </div>
          <div>
            <p className="text-primary/50 text-xs tracking-widest uppercase mb-0.5">
              Nationality
            </p>
            <p className="text-primary text-sm font-medium">{nationality}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<InquirySubmission | null>(null);
  const [status, setStatus] = useState<InquiryStatus>("new");
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const found = mockInquiries.find((inq) => inq.id === id);
    if (found) {
      setInquiry(found);
      setStatus(found.status);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleStatusChange = (newStatus: InquiryStatus) => {
    setStatus(newStatus);
    // In a real app: call API here
  };

  const handleDelete = () => {
    // In a real app: call delete API
    setShowDeleteModal(false);
    router.push("/dashboard/inquiry");
  };

  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
          Not Found
        </p>
        <p className="text-primary/80 text-sm mb-6">
          This inquiry does not exist.
        </p>
        <Link
          href="/dashboard/inquiry"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Inquiries
        </Link>
      </div>
    );
  }

  if (!inquiry) return null;

  const coupleNames = `${inquiry.nameOfBride} & ${inquiry.nameOfGroom}`;

  const submittedDate = new Date(inquiry.submittedAt).toLocaleDateString(
    "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );
  const submittedTime = new Date(inquiry.submittedAt).toLocaleTimeString(
    "en-GB",
    { hour: "2-digit", minute: "2-digit" }
  );

  const weddingDateFormatted = inquiry.weddingDate
    ? new Date(inquiry.weddingDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const arrivalFormatted = inquiry.arrivalDate
    ? new Date(inquiry.arrivalDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const departureFormatted = inquiry.departureDate
    ? new Date(inquiry.departureDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/inquiry"
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              Wedding Inquiry
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {coupleNames}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:cursor-pointer hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">

          {/* Contact Information */}
          <SectionBlock title="Contact Information">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-rose-50">
                <Heart className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h2 className="text-primary text-xl font-semibold mb-1">
                  {coupleNames}
                </h2>
                <p className="text-primary/60 text-sm tracking-wider">
                  Submitted by {inquiry.yourName}
                </p>
              </div>
            </div>

            <div>
              <InfoRow
                icon={User}
                label="Submitted By"
                value={inquiry.yourName}
              />
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={inquiry.yourEmail}
                href={`mailto:${inquiry.yourEmail}`}
              />
              <InfoRow
                icon={Phone}
                label="Telephone"
                value={inquiry.telephone}
                href={`tel:${inquiry.telephone}`}
              />
              <InfoRow
                icon={Globe}
                label="Address / Origin"
                value={inquiry.yourAddress}
              />
            </div>
          </SectionBlock>

          {/* Couple Details */}
          <SectionBlock title="Couple Details">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <CoupleColumn
                role="Bride"
                name={inquiry.nameOfBride}
                religion={inquiry.religionOfBride}
                nationality={inquiry.nationalityOfBride}
              />
              <div className="hidden sm:block w-px bg-primary/10 self-stretch" />
              <CoupleColumn
                role="Groom"
                name={inquiry.nameOfGroom}
                religion={inquiry.religionOfGroom}
                nationality={inquiry.nationalityOfGroom}
              />
            </div>
          </SectionBlock>

          {/* Wedding Details */}
          <SectionBlock title="Wedding Details">
            <div>
              <InfoRow
                icon={CalendarDays}
                label="Wedding Date"
                value={weddingDateFormatted}
              />
              <InfoRow
                icon={MapPin}
                label="Preferred Venue"
                value={inquiry.weddingVenue}
              />
              <InfoRow
                icon={Users}
                label="Number of Attendees"
                value={`${inquiry.numberOfAttendance} guests`}
              />
              <InfoRow
                icon={DollarSign}
                label="Approximate Budget"
                value={inquiry.approximateWeddingBudget}
              />
            </div>
          </SectionBlock>

          {/* Accommodation & Travel */}
          <SectionBlock title="Accommodation & Travel">
            <div>
              <InfoRow
                icon={Hotel}
                label="Hotel in Bali"
                value={inquiry.hotelNameInBali}
              />
              <InfoRow
                icon={Plane}
                label="Arrival Date"
                value={arrivalFormatted}
              />
              <InfoRow
                icon={Plane}
                label="Departure Date"
                value={departureFormatted}
              />
            </div>
          </SectionBlock>

          {/* Vision & Message */}
          <SectionBlock title="Vision & Message">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/5 flex-shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-primary/50" />
              </div>
              <p className="text-primary/80 text-sm leading-relaxed">
                {inquiry.yourMessage}
              </p>
            </div>
          </SectionBlock>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">

          {/* Status Manager */}
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Inquiry Status
            </p>

            <div className="mb-4">
              <span
                className={`inline-block text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${inquiryStatusConfig[status].classes}`}
              >
                {inquiryStatusConfig[status].label}
              </span>
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as InquiryStatus)
                }
                className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
              >
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="quoted">Quoted</option>
                <option value="booked">Booked</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
            </div>

            <p className="text-primary/40 text-xs mt-3">
              Update status to track your inquiry pipeline.
            </p>
          </div>

          {/* Inquiry Meta */}
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Inquiry Details
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Type
                </p>
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-primary text-sm font-medium">
                    Wedding Inquiry
                  </span>
                </div>
              </div>
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Submitted On
                </p>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-primary text-sm font-medium">
                      {submittedDate}
                    </p>
                    <p className="text-primary/50 text-xs">{submittedTime}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Inquiry ID
                </p>
                <p className="text-primary/60 text-xs font-mono">{inquiry.id}</p>
              </div>
            </div>
          </div>

          {/* At a Glance */}
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              At a Glance
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Guests
                </span>
                <span className="text-primary text-sm font-semibold">
                  {inquiry.numberOfAttendance}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Budget
                </span>
                <span className="text-primary text-xs font-medium text-right max-w-[160px]">
                  {inquiry.approximateWeddingBudget}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Venue
                </span>
                <span className="text-primary text-xs font-medium text-right max-w-[160px]">
                  {inquiry.weddingVenue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Date
                </span>
                <span className="text-primary text-xs font-medium">
                  {inquiry.weddingDate
                    ? new Date(inquiry.weddingDate).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Quick Actions
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${inquiry.yourEmail}`}
                className="flex items-center gap-2.5 w-full bg-primary text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
              <a
                href={`tel:${inquiry.telephone}`}
                className="flex items-center gap-2.5 w-full border border-primary/30 text-primary text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <DeleteModal
          name={coupleNames}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}