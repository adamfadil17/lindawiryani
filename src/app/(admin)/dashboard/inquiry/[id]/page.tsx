"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
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
  AlertCircle,
  Globe,
  Hotel,
  Plane,
  DollarSign,
  User,
  Flag,
  BookOpen,
  Loader2,
} from "lucide-react";
import { InquiryStatus, InquirySubmission, inquiryStatusConfig } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const ALL_STATUSES: InquiryStatus[] = [
  "new",
  "reviewed",
  "quoted",
  "booked",
  "archived",
];

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  href?: string;
}) {
  if (!value) return null;
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

export default function InquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<InquirySubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [statusUpdateStatus, setStatusUpdateStatus] = useState<
    "idle" | "saving"
  >("idle");

  const [deleteStatus, setDeleteStatus] = useState<
    "idle" | "confirm" | "deleting"
  >("idle");

  useEffect(() => {
    setIsLoading(true);
    const getInquiryById = async () => {
      try {
        const response = await axios.get(`/api/inquiries/${id}`);
        const data: InquirySubmission = response.data.data ?? response.data;
        setInquiry(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          const errorMsg =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Failed to load inquiry";
          toast.error(errorMsg, {
            description: err instanceof Error ? err.message : "Unknown error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getInquiryById();
  }, [id]);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!inquiry || newStatus === inquiry.status) return;
    setStatusUpdateStatus("saving");
    try {
      await axios.patch(
        `/api/inquiries/${id}`,
        { status: newStatus },
        { headers: getAuthHeaders(true) },
      );
      setInquiry((prev) => (prev ? { ...prev, status: newStatus } : prev));
      toast.success("Status updated", {
        description: `Inquiry marked as "${inquiryStatusConfig[newStatus].label}".`,
      });
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      toast.error("Failed to update status", { description: errorMsg });
    } finally {
      setStatusUpdateStatus("idle");
    }
  };

  const deleteInquiryById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/inquiries/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Inquiry deleted!", {
        description: "The inquiry has been removed from the system.",
      });
      router.push("/dashboard/inquiry");
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

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20" />
          <div className="space-y-2">
            <div className="h-3 w-28 bg-primary/10 rounded" />
            <div className="h-6 w-52 bg-primary/10 rounded" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white border border-primary/20 p-6 space-y-4"
              >
                <div className="h-3 w-36 bg-primary/10 rounded" />
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-primary/10 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-44 bg-primary/10 rounded" />
                    <div className="h-3 w-28 bg-primary/10 rounded" />
                  </div>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="h-10 bg-primary/5 rounded" />
                <div className="h-10 bg-primary/5 rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-3 w-28 bg-primary/10 rounded" />
              <div className="h-8 w-20 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-3 w-28 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-3">
              <div className="h-3 w-24 bg-primary/10 rounded" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-12 bg-primary/10 rounded" />
                  <div className="h-3 w-24 bg-primary/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!inquiry) return null;

  const coupleNames = `${inquiry.name_of_bride} & ${inquiry.name_of_groom}`;

  const submittedDate = new Date(inquiry.submitted_at).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  const submittedTime = new Date(inquiry.submitted_at).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const weddingDateFormatted = inquiry.wedding_date
    ? new Date(inquiry.wedding_date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const arrivalFormatted = inquiry.arrival_date
    ? new Date(inquiry.arrival_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const departureFormatted = inquiry.departure_date
    ? new Date(inquiry.departure_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
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
            onClick={() => setDeleteStatus("confirm")}
            disabled={deleteStatus === "deleting"}
            className="inline-flex items-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:cursor-pointer hover:bg-red-50 transition-colors disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
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
                  Submitted by {inquiry.your_name}
                </p>
              </div>
            </div>
            <div>
              <InfoRow
                icon={User}
                label="Submitted By"
                value={inquiry.your_name}
              />
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={inquiry.your_email}
                href={`mailto:${inquiry.your_email}`}
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
                value={inquiry.your_address}
              />
            </div>
          </SectionBlock>

          <SectionBlock title="Couple Details">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <CoupleColumn
                role="Bride"
                name={inquiry.name_of_bride}
                religion={inquiry.religion_of_bride}
                nationality={inquiry.nationality_of_bride}
              />
              <div className="hidden sm:block w-px bg-primary/10 self-stretch" />
              <CoupleColumn
                role="Groom"
                name={inquiry.name_of_groom}
                religion={inquiry.religion_of_groom}
                nationality={inquiry.nationality_of_groom}
              />
            </div>
          </SectionBlock>

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
                value={inquiry.wedding_venue}
              />
              <InfoRow
                icon={Users}
                label="Number of Attendees"
                value={`${inquiry.number_of_attendance} guests`}
              />
              <InfoRow
                icon={DollarSign}
                label="Approximate Budget"
                value={inquiry.approximate_wedding_budget}
              />
            </div>
          </SectionBlock>

          <SectionBlock title="Accommodation & Travel">
            <div>
              <InfoRow
                icon={Hotel}
                label="Hotel in Bali"
                value={inquiry.hotel_name_in_bali}
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

          <SectionBlock title="Vision & Message">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/5 flex-shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-primary/50" />
              </div>
              <p className="text-primary/80 text-sm leading-relaxed">
                {inquiry.your_message}
              </p>
            </div>
          </SectionBlock>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Inquiry Status
            </p>

            <div className="mb-4">
              <span
                className={`inline-block text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${inquiryStatusConfig[inquiry.status].classes}`}
              >
                {inquiryStatusConfig[inquiry.status].label}
              </span>
            </div>

            <div className="relative">
              <select
                value={inquiry.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as InquiryStatus)
                }
                disabled={statusUpdateStatus === "saving"}
                className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {inquiryStatusConfig[s].label}
                  </option>
                ))}
              </select>
              {statusUpdateStatus === "saving" ? (
                <Loader2 className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
              ) : (
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
              )}
            </div>

            <p className="text-primary/40 text-xs mt-3">
              Update status to track your inquiry pipeline.
            </p>
          </div>

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
                <p className="text-primary/60 text-xs font-mono">
                  {inquiry.id}
                </p>
              </div>
            </div>
          </div>

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
                  {inquiry.number_of_attendance}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Budget
                </span>
                <span className="text-primary text-xs font-medium text-right max-w-[160px]">
                  {inquiry.approximate_wedding_budget}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Venue
                </span>
                <span className="text-primary text-xs font-medium text-right max-w-[160px]">
                  {inquiry.wedding_venue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary/50 text-xs tracking-wider uppercase">
                  Date
                </span>
                <span className="text-primary text-xs font-medium">
                  {inquiry.wedding_date
                    ? new Date(inquiry.wedding_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Quick Actions
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${inquiry.your_email}`}
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

      {deleteStatus === "confirm" || deleteStatus === "deleting" ? (
        <DeleteModal
          name={coupleNames}
          onConfirm={deleteInquiryById}
          onCancel={() =>
            deleteStatus !== "deleting" && setDeleteStatus("idle")
          }
          isLoading={deleteStatus === "deleting"}
        />
      ) : null}
    </div>
  );
}
