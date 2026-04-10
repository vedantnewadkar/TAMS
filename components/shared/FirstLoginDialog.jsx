"use client";

import React from "react";
import {
  User,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Briefcase,
  Phone,
  Hash,
  Users
} from "lucide-react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const FirstLoginDialog = ({ isOpen, role = "student", onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    dob: "",
    branch: "",
    year: "",
    address: "",
    wardRollNo: "",
    department: "",
    relation: "",
  });

  const totalSteps = role === "student" ? 3 : role === "teacher" || role === "mentor" ? 3 : 2;

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    onComplete && onComplete(formData);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-2xl glass border-white/10 p-0 rounded-[2rem] overflow-hidden focus:outline-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />

        <div className="p-8 md:p-10 space-y-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">First Time Setup</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Complete Your Profile</h2>
              <p className="text-xs text-zinc-500">This information helps personalize your TAMS experience. Step {step} of {totalSteps}.</p>
            </div>
            <div className="h-12 w-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-sm font-black text-indigo-400">
              {step}/{totalSteps}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={cn(
                "h-1 flex-grow rounded-full transition-all duration-500",
                i + 1 <= step ? "bg-indigo-500" : "bg-white/5"
              )} />
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {/* Step 1 — Photo + Basic Info (Everyone) */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative cursor-pointer w-20 h-20 rounded-2xl bg-indigo-500/10 border border-dashed border-indigo-500/30 flex items-center justify-center hover:bg-indigo-500/20 transition-all flex-shrink-0">
                    <Camera className="h-7 w-7 text-indigo-400" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
                      <span className="text-[10px] text-white font-black">+</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Profile Photo</h4>
                    <p className="text-xs text-zinc-600 mt-1">Click to upload your photo (optional)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        className="pl-10 h-12 glass border-white/5 rounded-xl text-white font-medium"
                        placeholder="e.g. Arjun Patel"
                        value={formData.fullName}
                        onChange={e => update("fullName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date of Birth</label>
                    <Input
                      type="date"
                      className="h-12 glass border-white/5 rounded-xl text-white font-medium"
                      value={formData.dob}
                      onChange={e => update("dob", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input
                      type="tel"
                      className="pl-10 h-12 glass border-white/5 rounded-xl text-white font-medium"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={e => update("phone", e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Role-specific Info */}
            {step === 2 && (
              <div className="space-y-5">
                {role === "student" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Branch</label>
                        <Select onValueChange={v => update("branch", v)}>
                          <SelectTrigger className="glass border-white/5 h-12 rounded-xl text-white font-medium">
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/10">
                            <SelectItem value="CE">Computer Engineering</SelectItem>
                            <SelectItem value="IT">Information Technology</SelectItem>
                            <SelectItem value="ME">Mechanical Engineering</SelectItem>
                            <SelectItem value="EE">Electrical Engineering</SelectItem>
                            <SelectItem value="ET">Electronics & Telecomm</SelectItem>
                            <SelectItem value="AI">Artificial Intelligence</SelectItem>
                            <SelectItem value="CL">Civil Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Year</label>
                        <Select onValueChange={v => update("year", v)}>
                          <SelectTrigger className="glass border-white/5 h-12 rounded-xl text-white font-medium">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/10">
                            <SelectItem value="1">First Year</SelectItem>
                            <SelectItem value="2">Second Year</SelectItem>
                            <SelectItem value="3">Third Year</SelectItem>
                            <SelectItem value="4">Fourth Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Home Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                        <textarea
                          className="w-full pl-10 pt-3 pb-3 pr-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium text-sm min-h-[80px] resize-none focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-700"
                          placeholder="Enter your home address..."
                          value={formData.address}
                          onChange={e => update("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {role === "parent" && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ward's Roll Number</label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                        <Input
                          className="pl-10 h-12 glass border-white/5 rounded-xl text-white font-medium uppercase"
                          placeholder="e.g. CE22A001"
                          value={formData.wardRollNo}
                          onChange={e => update("wardRollNo", e.target.value.toUpperCase())}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Relation to Student</label>
                      <Select onValueChange={v => update("relation", v)}>
                        <SelectTrigger className="glass border-white/5 h-12 rounded-xl text-white font-medium">
                          <SelectValue placeholder="Select Relation" />
                        </SelectTrigger>
                        <SelectContent className="glass border-white/10">
                          <SelectItem value="father">Father</SelectItem>
                          <SelectItem value="mother">Mother</SelectItem>
                          <SelectItem value="guardian">Legal Guardian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Home Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                        <textarea
                          className="w-full pl-10 pt-3 pb-3 pr-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium text-sm min-h-[80px] resize-none focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-700"
                          placeholder="Enter your home address..."
                          value={formData.address}
                          onChange={e => update("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(role === "teacher" || role === "mentor") && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Department</label>
                      <Select onValueChange={v => update("department", v)}>
                        <SelectTrigger className="glass border-white/5 h-12 rounded-xl text-white font-medium">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent className="glass border-white/10">
                          <SelectItem value="CE">Computer Engineering</SelectItem>
                          <SelectItem value="IT">Information Technology</SelectItem>
                          <SelectItem value="ME">Mechanical Engineering</SelectItem>
                          <SelectItem value="EE">Electrical Engineering</SelectItem>
                          <SelectItem value="ET">Electronics & Telecomm</SelectItem>
                          <SelectItem value="AI">Artificial Intelligence</SelectItem>
                          <SelectItem value="CL">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                      <p className="text-xs text-zinc-500">
                        Your Employee ID and class assignments have been configured by the administrator. You can view them in your dashboard settings.
                      </p>
                    </div>
                  </div>
                )}

                {role === "admin" && (
                  <div className="space-y-5">
                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-center">
                      <Users className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-white">Admin Account</h4>
                      <p className="text-xs text-zinc-500 mt-2">Your admin privileges grant you full access to all system features. Please review the admin guidelines before proceeding.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3 — Review & Confirm */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center h-full py-8 space-y-8">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-black text-white tracking-tight">Profile Ready</h3>
                  <p className="text-xs text-zinc-500 max-w-[280px] leading-relaxed">
                    Your profile information has been entered successfully. Click "Complete Setup" to activate your account and access your dashboard.
                  </p>
                </div>
                <div className="w-full p-5 bg-white/3 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Name</span>
                    <span className="text-white font-medium">{formData.fullName || "—"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Phone</span>
                    <span className="text-white font-medium">{formData.phone || "—"}</span>
                  </div>
                  {role === "student" && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-600">Branch / Year</span>
                      <span className="text-white font-medium">{formData.branch || "—"} / Year {formData.year || "—"}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="flex-grow rounded-xl h-12 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-white border border-white/5 hover:border-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-[2] rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-xs"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {step === totalSteps ? "Complete Setup" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
