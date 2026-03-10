"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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
  X,
  AlertCircle,
} from "lucide-react";
import { Vendor, Career } from "@/lib/types/new-strucutre";

// ─── Types ────────────────────────────────────────────────────────────────────

type SubmissionType = "vendor" | "career";
type SubmissionStatus = "new" | "reviewed" | "contacted" | "archived";

interface VendorSubmission extends Vendor {
  id: string;
  type: "vendor";
  status: SubmissionStatus;
  submittedAt: string;
}

interface CareerSubmission extends Career {
  id: string;
  type: "career";
  status: SubmissionStatus;
  submittedAt: string;
}

type Submission = VendorSubmission | CareerSubmission;

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
      "We specialize in tropical and Balinese floral arrangements for luxury weddings. Our team has worked with over 200 couples across Bali and Lombok. We pride ourselves on sourcing locally grown flowers and collaborating with artisan basket weavers to create truly unique arrangements.",
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
      "I have been passionate about creating unforgettable wedding experiences for the past 6 years, with specialization in destination weddings across Southeast Asia. I have managed events from intimate elopements for 10 guests to grand celebrations for 400 guests, always ensuring every detail reflects the couple's unique story.",
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
      "Award-winning wedding film studio based in Seminyak. We craft timeless cinematic stories for couples from around the world. Our films have been screened at international film festivals and featured in global bridal publications.",
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
      "Detail-oriented event coordinator with experience in luxury hospitality. Looking to bring my organizational skills and calm demeanor under pressure to a world-class wedding company where I can grow and learn from the best in the industry.",
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
      "Fine art wedding photography with 12 years of experience in Bali. Our work has been featured in Vogue Weddings and Harper's Bazaar Bride. We offer both documentary and editorial styles tailored to each couple.",
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
      "Passionate wedding stylist with expertise in contemporary Balinese and minimalist aesthetics. Previously worked with The Ritz-Carlton Bali and COMO Uma Ubud. I am drawn to your brand's philosophy of crafting intimate, meaningful ceremonies.",
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const statusConfig: Record<
  SubmissionStatus,
  { label: string; classes: string }
> = {
  new: {
    label: "New",
    classes: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  reviewed: {
    label: "Reviewed",
    classes: "bg-amber-50 text-amber-600 border border-amber-100",
  },
  contacted: {
    label: "Contacted",
    classes: "bg-green-50 text-green-600 border border-green-100",
  },
  archived: {
    label: "Archived",
    classes: "bg-primary/5 text-primary/40 border border-primary/10",
  },
};

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareerPartnershipDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("new");
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const found = mockSubmissions.find((s) => s.id === id);
    if (found) {
      setSubmission(found);
      setStatus(found.status);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    setStatus(newStatus);
    // In a real app: call API here
  };

  const handleDelete = () => {
    // In a real app: call delete API
    setShowDeleteModal(false);
    router.push("/dashboard/career-partnership");
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

  if (!submission) return null;

  const isVendor = submission.type === "vendor";
  const vendor = submission as VendorSubmission;
  const career = submission as CareerSubmission;

  const displayName = isVendor ? vendor.companyName : career.fullName;
  const subLabel = isVendor ? vendor.vendorCategory : career.position;
  const submittedDate = new Date(submission.submittedAt).toLocaleDateString(
    "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );
  const submittedTime = new Date(submission.submittedAt).toLocaleTimeString(
    "en-GB",
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
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
          {/* Identity */}
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
                <p className="text-primary/60 text-sm tracking-wider">
                  {subLabel}
                </p>
              </div>
            </div>

            <div>
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={isVendor ? vendor.email : career.email}
                href={`mailto:${isVendor ? vendor.email : career.email}`}
              />
              <InfoRow
                icon={Phone}
                label="Phone Number"
                value={isVendor ? vendor.phone : career.phone}
                href={`tel:${isVendor ? vendor.phone : career.phone}`}
              />
              {isVendor && vendor.contactPerson && (
                <InfoRow
                  icon={UserCheck}
                  label="Contact Person"
                  value={vendor.contactPerson}
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
              {!isVendor && career.linkedIn && (
                <InfoRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value={career.linkedIn.replace(/^https?:\/\//, "")}
                  href={career.linkedIn}
                />
              )}
              {(isVendor ? vendor.portfolioLink : career.portfolioLink) && (
                <InfoRow
                  icon={ExternalLink}
                  label="Portfolio"
                  value={(isVendor
                    ? vendor.portfolioLink
                    : career.portfolioLink
                  ).replace(/^https?:\/\//, "")}
                  href={isVendor ? vendor.portfolioLink : career.portfolioLink}
                />
              )}
            </div>
          </SectionBlock>

          {/* Vendor-specific */}
          {isVendor && (
            <SectionBlock title="Vendor Details">
              <div>
                <InfoRow
                  icon={Briefcase}
                  label="Vendor Category"
                  value={vendor.vendorCategory}
                />
                <InfoRow
                  icon={Building2}
                  label="Years in Business"
                  value={`${vendor.yearsInBusiness} years`}
                />
              </div>
            </SectionBlock>
          )}

          {/* Career-specific */}
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

          {/* Message / Cover Letter */}
          <SectionBlock title={isVendor ? "Message" : "Cover Letter"}>
            <div className="flex items-start gap-3 mb-1">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/5 flex-shrink-0">
                {isVendor ? (
                  <MessageSquare className="w-3.5 h-3.5 text-primary/50" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 text-primary/50" />
                )}
              </div>
              <p className="text-primary/80 text-sm leading-relaxed">
                {isVendor ? vendor.message : career.coverLetter}
              </p>
            </div>
          </SectionBlock>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">
          {/* Status Manager */}
          <div className="bg-white border border-primary/20 p-6">
            <p className="text-primary/60 text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-primary/10">
              Submission Status
            </p>

            <div className="mb-4">
              <span
                className={`inline-block text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${statusConfig[status].classes}`}
              >
                {statusConfig[status].label}
              </span>
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as SubmissionStatus)
                }
                className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
              >
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
            </div>

            <p className="text-primary/40 text-xs mt-3">
              Update status to track your outreach progress.
            </p>
          </div>

          {/* Submission Meta */}
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
                    <p className="text-primary text-sm font-medium">
                      {submittedDate}
                    </p>
                    <p className="text-primary/50 text-xs">{submittedTime}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">
                  Submission ID
                </p>
                <p className="text-primary/60 text-xs font-mono">
                  {submission.id}
                </p>
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
                href={`mailto:${isVendor ? vendor.email : career.email}`}
                className="flex items-center gap-2.5 w-full bg-primary text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
              <a
                href={`tel:${isVendor ? vendor.phone : career.phone}`}
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
          name={displayName}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}