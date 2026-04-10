"use client";

import React from "react";
import {
  GraduationCap,
  Users,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Phone,
  User,
  Hash,
  BookOpen,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { students } from "@/lib/dummy-data";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const [role, setRole] = React.useState(null);
  const [step, setStep] = React.useState(1);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    rollNumber: "",
    branch: "",
    year: "",
    wardRollNumber: "",
    relation: "",
  });

  const validRollNumbers = students.map(s => s.rollNo);

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) { setError("Full name is required."); return false; }
    if (!formData.email.includes("@")) { setError("Please enter a valid email address."); return false; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (role === "student") {
      if (!formData.rollNumber.trim()) { setError("Roll number is required."); return false; }
      if (!validRollNumbers.includes(formData.rollNumber.toUpperCase())) {
        setError(`Roll number not found in system. Your account must be pre-registered by the college admin. Valid example: CE22A001`);
        return false;
      }
      if (!formData.phone.trim() || formData.phone.length < 10) { setError("Enter a valid 10-digit phone number."); return false; }
    } else {
      if (!formData.wardRollNumber.trim()) { setError("Ward's roll number is required."); return false; }
      if (!validRollNumbers.includes(formData.wardRollNumber.toUpperCase())) {
        setError(`Student with this roll number not found. Please check and try again.`);
        return false;
      }
      if (!formData.relation) { setError("Please select your relation to the student."); return false; }
      if (!formData.phone.trim() || formData.phone.length < 10) { setError("Enter a valid 10-digit phone number."); return false; }
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else {
      if (!validateStep2()) return;
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await registerUser({
        email: formData.email,
        name: formData.fullName,
        role,
        rollNumber: role === "student" ? formData.rollNumber.toUpperCase() : formData.wardRollNumber.toUpperCase(),
        phone: formData.phone,
        relation: formData.relation,
      });
      setSuccess(true);
      setTimeout(() => router.push(`/${role}`), 1500);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Account Created!</h2>
          <p className="text-zinc-500 text-sm">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-zinc-950 border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(79,70,229,0.1),transparent)]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">TAMS</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">RAIT — Ramrao Adik Institute of Technology</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[0.95]">
            Student &<br />
            <span className="text-indigo-500">Parent</span><br />
            Portal
          </h1>
          <p className="text-base text-zinc-400 max-w-sm leading-relaxed">
            Register to access attendance reports, academic progress, mentor communication, and fee management — all in one place.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            { icon: GraduationCap, label: "Students must be pre-registered by the college admin" },
            { icon: Users, label: "Parents link to their ward using the student roll number" },
            { icon: BookOpen, label: "Access your complete academic dashboard instantly" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="text-xs text-zinc-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {!role ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">Create Account</h2>
                <p className="text-sm text-zinc-500">Who are you registering as?</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setRole("student")}
                  className="p-8 rounded-2xl border border-white/8 bg-white/3 flex items-center gap-6 text-left hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-7 w-7 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Student</h3>
                    <p className="text-xs text-zinc-500 mt-1">Access attendance, marks, doubts & more</p>
                    <p className="text-[11px] text-zinc-700 mt-2">Requires a valid college roll number</p>
                  </div>
                </button>

                <button
                  onClick={() => setRole("parent")}
                  className="p-8 rounded-2xl border border-white/8 bg-white/3 flex items-center gap-6 text-left hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="h-7 w-7 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Parent / Guardian</h3>
                    <p className="text-xs text-zinc-500 mt-1">Monitor your ward's progress & fees</p>
                    <p className="text-[11px] text-zinc-700 mt-2">Requires your ward's roll number</p>
                  </div>
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-zinc-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => { if (step === 1) setRole(null); else setStep(1); setError(""); }}
                  className="flex items-center gap-2 text-xs text-zinc-600 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {step === 1 ? "Back to role selection" : "Back to step 1"}
                </button>
                <h2 className="text-2xl font-bold text-white capitalize">
                  {role === "parent" ? "Parent" : "Student"} Registration
                </h2>
                <p className="text-xs text-zinc-500">Step {step} of 2</p>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-2">
                {[1, 2].map(i => (
                  <div
                    key={i}
                    className={cn("h-1 flex-grow rounded-full transition-all", i <= step ? "bg-indigo-500" : "bg-white/10")}
                  />
                ))}
              </div>

              {/* Step 1 Fields */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0"
                        placeholder="e.g. Arjun Patel"
                        value={formData.fullName}
                        onChange={e => updateField("fullName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        type="email"
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0"
                        placeholder="e.g. arjun@gmail.com"
                        value={formData.email}
                        onChange={e => updateField("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0"
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={e => updateField("password", e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Fields — Student */}
              {step === 2 && role === "student" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                    <p className="text-xs text-indigo-400">
                      <span className="font-semibold">Note:</span> Your roll number must already be registered in the system by your college administrator. Contact admin if you don't have one.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Roll Number</label>
                    <div className="relative">
                      <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0 uppercase"
                        placeholder="e.g. CE22A001"
                        value={formData.rollNumber}
                        onChange={e => updateField("rollNumber", e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <p className="text-[11px] text-zinc-700 pl-1">Format: Branch code + Year + Division + Number (e.g. CE22A001)</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        type="tel"
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={e => updateField("phone", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Fields — Parent */}
              {step === 2 && role === "parent" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <p className="text-xs text-violet-400">
                      <span className="font-semibold">Note:</span> Enter your ward's college roll number to link your account to their profile.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ward's Roll Number</label>
                    <div className="relative">
                      <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0 uppercase"
                        placeholder="e.g. CE22A001"
                        value={formData.wardRollNumber}
                        onChange={e => updateField("wardRollNumber", e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Relationship to Student</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Father", "Mother", "Guardian"].map(rel => (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => updateField("relation", rel)}
                          className={cn(
                            "h-11 rounded-xl border text-sm font-medium transition-all",
                            formData.relation === rel
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:border-indigo-500/40"
                          )}
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        type="tel"
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:ring-0"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={e => updateField("phone", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <AlertCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-rose-400 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 1 ? "Continue" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-zinc-600">
                Already registered?{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
