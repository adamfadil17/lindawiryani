"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  UserCheck,
  Mail,
  Phone,
  ExternalLink,
  Clock,
  Building2,
  CalendarDays,
  BookOpen,
  MessageSquare,
  Globe,
  Linkedin,
  ChevronDown,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import DeleteModal from "@/components/shared/delete-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import {
  SubmissionStatus,
  VendorSubmission,
  CareerSubmission,
  Submission,
  submissionStatusConfig,
} from "@/types";


const status_options: SubmissionStatus[] = [
  "new",
  "reviewed",
  "contacted",
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


export default function SubmissionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [statusUpdateStatus, setStatusUpdateStatus] = useState<"idle" | "saving">("idle");

  const [deleteStatus, setDeleteStatus] = useState<"idle" | "confirm" | "deleting">("idle");

  useEffect(() => {
    setIsLoading(true);
    const getSubmissionById = async () => {
      try {
        const response = await axios.get(`/api/submissions/${id}`);
        const data = response.data.data ?? response.data;
        setSubmission(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          const errorMsg =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Failed to load submission";
          toast.error(errorMsg, {
            description: err instanceof Error ? err.message : "Unknown error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getSubmissionById();
  }, [id]);

  const handleStatusChange = async (newStatus: SubmissionStatus) => {
    if (!submission || newStatus === submission.status) return;
    setStatusUpdateStatus("saving");
    try {
      await axios.patch(
        `/api/submissions/${id}`,
        { status: newStatus },
        { headers: getAuthHeaders(true) },
      );
      setSubmission((prev) => (prev ? { ...prev, status: newStatus } : prev));
      toast.success("Status updated", {
        description: `Submission marked as "${submissionStatusConfig[newStatus].label}".`,
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

  const handleDelete = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/submissions/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Submission deleted!", {
        description: "The submission has been removed from the system.",
      });
      router.push("/dashboard/career-partnership");
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
          This submission does not exist.
        </p>
        <Link
          href="/dashboard/career-partnership"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Submissions
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
            <div className="h-3 w-24 bg-primary/10 rounded" />
            <div className="h-6 w-48 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-primary/20 p-6 space-y-4">
                <div className="h-3 w-32 bg-primary/10 rounded" />
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-primary/10 rounded" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-primary/10 rounded" />
                    <div className="h-3 w-24 bg-primary/10 rounded" />
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!submission) return null;

  const isVendor = submission.type === "vendor";
  const vendor = submission as VendorSubmission;
  const career = submission as CareerSubmission;

  const displayName = isVendor ? vendor.company_name : career.full_name;
  const subLabel = isVendor ? vendor.vendor_category : career.position;

  const submittedDate = new Date(submission.submitted_at).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const submittedTime = new Date(submission.submitted_at).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/career-partnership"
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isVendor ? "Vendor Submission" : "Career Application"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {displayName}
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
          <SectionBlock title={isVendor ? "Company Information" : "Applicant Information"}>
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-14 h-14 flex-shrink-0 flex items-center justify-center ${
                  isVendor ? "bg-primary/10" : "bg-amber-50"
                }`}
              >
                {isVendor ? (
                  <Briefcase className="w-6 h-6 text-primary/60" />
                ) : (
                  <UserCheck className="w-6 h-6 text-amber-500" />
                )}
              </div>
              <div>
                <h2 className="text-primary text-xl font-semibold mb-1">
                  {displayName}
                </h2>
                <p className="text-primary/60 text-sm tracking-wider">{subLabel}</p>
              </div>
            </div>

            <div>
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={submission.email}
                href={`mailto:${submission.email}`}
              />
              <InfoRow
                icon={Phone}
                label="Phone Number"
                value={submission.phone}
                href={submission.phone ? `tel:${submission.phone}` : undefined}
              />
              {isVendor && (
                <InfoRow
                  icon={UserCheck}
                  label="Contact Person"
                  value={vendor.contact_person}
                />
              )}
              {isVendor && vendor.website && (
                <InfoRow
                  icon={Globe}
                  label="Website"
                  value={vendor.website.replace(/^https?:\/\//, "")}
                  href={vendor.website}
                />
              )}
              {!isVendor && career.linked_in && (
                <InfoRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value={career.linked_in.replace(/^https?:\/\//, "")}
                  href={career.linked_in}
                />
              )}
              {(isVendor ? vendor.portfolio_link : career.portfolio_link) && (
                <InfoRow
                  icon={ExternalLink}
                  label="Portfolio"
                  value={(isVendor ? vendor.portfolio_link : career.portfolio_link)!.replace(
                    /^https?:\/\//,
                    "",
                  )}
                  href={isVendor ? vendor.portfolio_link! : career.portfolio_link!}
                />
              )}
            </div>
          </SectionBlock>

          {isVendor && (
            <SectionBlock title="Vendor Details">
              <div>
                <InfoRow
                  icon={Briefcase}
                  label="Vendor Category"
                  value={vendor.vendor_category}
                />
                <InfoRow
                  icon={Building2}
                  label="Years in Business"
                  value={vendor.years_in_business ? `${vendor.years_in_business} years` : undefined}
                />
              </div>
            </SectionBlock>
          )}

          {!isVendor && (
            <SectionBlock title="Application Details">
              <div>
                <InfoRow
                  icon={Briefcase}
                  label="Position Applied"
                  value={career.position}
                />
                <InfoRow
                  icon={CalendarDays}
                  label="Years of Experience"
                  value={career.experience}
                />
              </div>
            </SectionBlock>
          )}

          {(isVendor ? submission.message : career.cover_letter) && (
            <SectionBlock title={isVendor ? "Message" : "Cover Letter"}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-primary/5 flex-shrink-0">
                  {isVendor ? (
                    <MessageSquare className="w-3.5 h-3.5 text-primary/50" />
                  ) : (
                    <BookOpen className="w-3.5 h-3.5 text-primary/50" />
                  )}
                </div>
                <p className="text-primary/80 text-sm leading-relaxed">
                  {isVendor ? submission.message : career.cover_letter}
                </p>
              </div>
            </SectionBlock>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Submission Status
            </p>

            <div className="mb-4">
              <span
                className={`inline-block text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${submissionStatusConfig[submission.status].classes}`}
              >
                {submissionStatusConfig[submission.status].label}
              </span>
            </div>

            <div className="relative">
              <select
                value={submission.status}
                onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus)}
                disabled={statusUpdateStatus === "saving"}
                className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status_options.map((s) => (
                  <option key={s} value={s}>
                    {submissionStatusConfig[s].label}
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
              Update status to track your outreach progress.
            </p>
          </div>

          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Submission Details
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Type
                </p>
                <div className="flex items-center gap-2">
                  {isVendor ? (
                    <Briefcase className="w-3.5 h-3.5 text-primary/50" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span className="text-primary text-sm font-medium capitalize">
                    {submission.type}
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
                    <p className="text-primary text-sm font-medium">{submittedDate}</p>
                    <p className="text-primary/50 text-xs">{submittedTime}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Submission ID
                </p>
                <p className="text-primary/60 text-xs font-mono">{submission.id}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Quick Actions
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${submission.email}`}
                className="flex items-center gap-2.5 w-full bg-primary text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
              {submission.phone && (
                <a
                  href={`tel:${submission.phone}`}
                  className="flex items-center gap-2.5 w-full border border-primary/30 text-primary text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {deleteStatus === "confirm" || deleteStatus === "deleting" ? (
        <DeleteModal
          name={displayName}
          onConfirm={handleDelete}
          onCancel={() => deleteStatus !== "deleting" && setDeleteStatus("idle")}
          isLoading={deleteStatus === "deleting"}
        />
      ) : null}
    </div>
  );
}