"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Shield,
  User as UserIcon,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { z } from "zod";

import { userFormSchema, UserFormData } from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { User, Role } from "@/types";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";

const ROLE_OPTIONS: {
  value: Role;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    value: "admin",
    label: "Admin",
    icon: <ShieldCheck className="w-4 h-4" />,
    desc: "Full access to all resources",
  },
  {
    value: "editor",
    label: "Editor",
    icon: <Shield className="w-4 h-4" />,
    desc: "Can create and edit content",
  },
  {
    value: "user",
    label: "User",
    icon: <UserIcon className="w-4 h-4" />,
    desc: "Read-only access",
  },
];

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";

  const [isFetching, setIsFetching] = useState(!isNew);
  const [showPassword, setShowPassword] = useState(false);

  const [unsavedModal, setUnsavedModal] = useState<{
    open: boolean;
    pendingHref?: string;
  }>({ open: false });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<z.input<typeof userFormSchema>, unknown, UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const selectedRole = watch("role");
  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const hasUnsavedChanges = isNew
    ? Boolean(watchedName || watchedEmail || watchedPassword)
    : isDirty;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isSubmitting]);

  const guardedNavigate = useCallback(
    (href: string) => {
      if (hasUnsavedChanges && !isSubmitting) {
        setUnsavedModal({ open: true, pendingHref: href });
      } else {
        router.push(href);
      }
    },
    [hasUnsavedChanges, isSubmitting, router],
  );

  const fetchUser = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get<{ data: User }>(`/api/users/${params.id}`, {
        headers: getAuthHeaders(),
      });
      const user = res.data.data;
      reset({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.status === 404
          ? "User not found."
          : `Error ${err.response?.status}: ${err.message}`
        : "Failed to load user.";
      toast.error(msg);
      router.push("/dashboard/users");
    } finally {
      setIsFetching(false);
    }
  }, [params.id, reset, router]);

  useEffect(() => {
    if (!isNew) fetchUser();
  }, [isNew, fetchUser]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isNew) {
        await axios.post("/api/users", data, { headers: getAuthHeaders() });
        toast.success("User created successfully.");
      } else {
        const payload: Partial<UserFormData> = { ...data };
        if (!payload.password) delete payload.password;
        await axios.patch(`/api/users/${params.id}`, payload, {
          headers: getAuthHeaders(),
        });
        toast.success("User updated successfully.");
      }
      reset(data);
      router.push("/dashboard/users");
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? err.message)
        : "Something went wrong.";
      toast.error(isNew ? "Failed to create user." : "Failed to update user.", {
        description: msg,
      });
    }
  };

  if (isFetching) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="h-5 w-32 bg-primary/10 rounded animate-pulse mb-8" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-primary/10 rounded mb-2 animate-pulse" />
              <div className="h-10 bg-primary/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => guardedNavigate("/dashboard/users")}
          className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-primary/50 hover:text-primary transition-colors mb-5"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Users
        </button>

        <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
          {isNew ? "New User" : "Edit User"}
        </p>
        <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
          {isNew ? "Create Account" : "Edit Account"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-primary/60 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Jane Doe"
            className={`w-full px-3 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors ${
              errors.name ? "border-red-400" : "border-primary/30"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-primary/60 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className={`w-full px-3 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors ${
              errors.email ? "border-red-400" : "border-primary/30"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-primary/60 mb-1.5">
            Password{" "}
            {isNew ? (
              <span className="text-red-400">*</span>
            ) : (
              <span className="normal-case tracking-normal text-primary/30">
                (leave blank to keep current)
              </span>
            )}
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder={
                isNew ? "Min. 8 chars, 1 uppercase, 1 number" : "••••••••"
              }
              className={`w-full px-3 py-2.5 pr-10 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors ${
                errors.password ? "border-red-400" : "border-primary/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-primary/60 mb-2">
            Role <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ROLE_OPTIONS.map(({ value, label, icon, desc }) => {
              const isSelected = selectedRole === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("role", value, { shouldDirty: true })}
                  className={`flex flex-col items-start gap-1 p-3 border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-primary/20 bg-white text-primary hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`${isSelected ? "text-white" : "text-primary/50"}`}
                  >
                    {icon}
                  </span>
                  <span className="text-xs font-semibold tracking-widest uppercase">
                    {label}
                  </span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isSelected ? "text-white/70" : "text-primary/40"
                    }`}
                  >
                    {desc}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-primary/10">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/users")}
            className="text-xs tracking-widest uppercase text-primary/40 hover:text-primary transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || (!isNew && !isDirty)}
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "Create User" : "Save Changes"}
          </button>
        </div>
      </form>

      {unsavedModal.open && (
        <UnsavedChangesModal
          mode={isNew ? "create" : "update"}
          onConfirmLeave={() => {
            setUnsavedModal({ open: false });
            if (unsavedModal.pendingHref) router.push(unsavedModal.pendingHref);
          }}
          onCancel={() => setUnsavedModal({ open: false })}
        />
      )}
    </div>
  );
}
