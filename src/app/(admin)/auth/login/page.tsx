"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.data?.token ?? data.token;

        if (token) {
          localStorage.setItem("token", token);

          document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }

        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
          duration: 2000,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Sign in failed", {
          description:
            data.error ??
            data.message ??
            "Invalid credentials. Please try again.",
        });
      }
    } catch {
      toast.error("Connection error", {
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-primary/50 bg-transparent focus:outline-none focus:border-primary/50 transition-colors disabled:bg-primary/10 text-primary placeholder:text-primary/50 text-sm";
  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";

  return (
    <main className="relative min-h-screen overflow-hidden flex">
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
        <Image
          src="/images/venues/banner/signature-bg.png"
          alt="Login visual"
          fill
          priority
          className="object-cover object-center"
          sizes="60vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />

        <div className="absolute inset-0 flex flex-col justify-between p-12 xl:p-16">
          <div className="max-w-md">
            <p className="text-white/70 tracking-[0.25em] uppercase text-xs mb-4">
              Studio Portal
            </p>
            <h2 className="text-3xl xl:text-4xl text-white font-semibold leading-tight">
              Where Every Detail
              <br />
              <span className="italic font-light">Becomes Extraordinary</span>
            </h2>
            <div className="mt-6 w-12 h-px bg-white/50" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center bg-white relative">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, currentColor 40px, currentColor 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)",
          }}
        />

        <div className="relative z-10 w-full max-w-md mx-auto px-8 sm:px-12 py-16">
          <div className="mb-10 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative h-14 w-[120px]">
                <Image
                  src="/images/logo-gray.png"
                  alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
                  className="h-14 w-auto mx-auto"
                  width={120}
                  height={56}
                  priority
                />
              </div>
              <div className="w-8 h-px bg-primary/30" />
            </div>
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl text-primary font-semibold leading-tight">
              Welcome Back
              <br />
              <span className="italic font-light text-xl md:text-2xl">
                Sign in to continue
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="email">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={submitting}
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={labelClass.replace("mb-2", "")}
                  htmlFor="password"
                >
                  Password <span className="text-red-400">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  autoComplete="current-password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-4 flex items-center text-primary/40 hover:text-primary/70 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary border border-primary text-white font-semibold py-3 text-sm tracking-widest hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed transition-all duration-300 uppercase"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* <div className="mt-8 text-center">
            <p className="text-primary/80 text-sm tracking-wide">
              Forgot your password?{" "}
              <Link
                href="/forgot-password"
                className="text-primary underline underline-offset-2 hover:text-primary/70 transition-colors"
              >
                Reset here
              </Link>
            </p>
          </div> */}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-xs tracking-widest uppercase transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
