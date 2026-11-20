"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/api";
import { toast } from "sonner";
import { ChevronLeft, Loader2, Save, Trash2 } from "lucide-react";

import { inquiryStatusConfig, type InquiryStatus, type InquirySubmission } from "@/types";

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<InquirySubmission | null>(null);
  const [status, setStatus] = useState<InquiryStatus>("new");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/inquiries/${id}`);
      const data: InquirySubmission = response.data.data ?? response.data;
      setInquiry(data);
      setStatus(data.status);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNotFound(true);
      } else {
        toast.error("Failed to load inquiry");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const saveStatus = async () => {
    setSaving(true);
    try {
      const response = await axios.patch(`/api/inquiries/${id}`, { status });
      setInquiry(response.data.data ?? inquiry);
      toast.success("Inquiry updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this inquiry permanently?")) return;
    setDeleting(true);
    try {
      await axios.delete(`/api/inquiries/${id}`);
      router.push("/dashboard/inquiries");
    } catch {
      toast.error("Failed to delete inquiry");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center py-32">
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (notFound || !inquiry) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center py-32">
        <p className="text-muted-foreground text-sm mb-4">Inquiry not found.</p>
        <Link href="/dashboard/inquiries" className="text-xs uppercase tracking-widest text-primary border-b border-primary/30">
          Back to inquiries
        </Link>
      </div>
    );
  }

  const config = inquiryStatusConfig[inquiry.status];

  return (
    <div className="p-6 lg:p-8 max-w-[1100px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/dashboard/inquiries"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary text-xs tracking-widest uppercase mb-2"
          >
            <ChevronLeft className="w-3 h-3" />
            Inquiries
          </Link>
          <h1 className="font-display text-2xl text-primary font-semibold">{inquiry.full_name}</h1>
          <p className="text-muted-foreground text-sm">
            Received {new Date(inquiry.submitted_at).toLocaleString()}
            {inquiry.locale ? ` · ${inquiry.locale}` : ""}
          </p>
        </div>
        <button
          onClick={remove}
          disabled={deleting}
          className="flex items-center gap-2 border border-red-200 text-red-700 text-xs tracking-widest uppercase px-4 py-3 hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>

      <div className="bg-white border border-primary/20 px-5 py-4 mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(inquiryStatusConfig) as InquiryStatus[]).map((value) => (
              <button
                key={value}
                onClick={() => setStatus(value)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
                  status === value
                    ? "bg-primary text-white border-primary"
                    : "border-primary/20 text-muted-foreground hover:border-primary/40"
                }`}
              >
                {inquiryStatusConfig[value].label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs tracking-widest uppercase px-2 py-1 ${config.classes}`}>
            Current: {config.label}
          </span>
          <button
            onClick={saveStatus}
            disabled={saving || status === inquiry.status}
            className="flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-4 py-3 disabled:opacity-40"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Contact">
          <Field label="Full name" value={inquiry.full_name} />
          <Field label="Email / WhatsApp" value={inquiry.email_or_whatsapp} />
        </Section>

        <Section title="Wedding details">
          <Field label="Wedding date" value={inquiry.wedding_date} />
          <Field label="Number of guests" value={inquiry.number_of_guests} />
          <Field label="Wedding style" value={inquiry.wedding_style} />
          <Field label="Estimated budget" value={inquiry.estimated_budget} />
          <Field label="Venue secured" value={inquiry.venue_secured} />
          <Field label="How they found us" value={inquiry.how_did_you_find_us} />
        </Section>

        <Section title="Location interest">
          <Tags values={inquiry.wedding_location_interest} />
        </Section>

        <Section title="Services needed">
          <Tags values={inquiry.services_needed} />
        </Section>

        <div className="md:col-span-2">
          <Section title="Their vision">
            <p className="text-sm text-primary leading-relaxed whitespace-pre-wrap">
              {inquiry.your_vision || "No additional information provided."}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-primary/20">
      <div className="px-5 py-3 border-b border-primary/10">
        <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase font-semibold">
          {title}
        </p>
      </div>
      <div className="p-5 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-muted-foreground text-xs tracking-widest uppercase mb-0.5">{label}</p>
      <p className="text-sm text-primary">{value || "—"}</p>
    </div>
  );
}

function Tags({ values }: { values?: string[] }) {
  if (!values || values.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((value) => (
        <span
          key={value}
          className="text-xs text-primary bg-primary/5 border border-primary/15 px-2.5 py-1"
        >
          {value}
        </span>
      ))}
    </div>
  );
}
