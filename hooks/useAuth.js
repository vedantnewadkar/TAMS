"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { seedIfNeeded, db, fakeDelay } from "@/lib/local-db";

// ─── Demo accounts — click-to-login ───────────────────────────────────────────
const DEMO_ACCOUNTS = {
  "admin@tams.edu": { name: "Kiran Desai", role: "admin" },
  "teacher@tams.edu": { name: "Prof. Rajesh Kumar", role: "teacher" },
  "mentor@tams.edu": { name: "Dr. Priya Sharma", role: "mentor" },
  "student@tams.edu": { name: "Arjun Patel", role: "student" },
  "parent@tams.edu": { name: "Sunita Patel", role: "parent" },
};

// ─── Keys ─────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "ec_user";
const COOKIE_ROLE = "user-role";
const COOKIE_AUTH = "auth-token";

function writeCookie(name, value, days = 7) {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/`;
}
function clearCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=-1; path=/`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* Bootstrap on mount */
  useEffect(() => {
    seedIfNeeded();          // make sure local DB is populated
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
        setRole(u.role);
        setIsAuth(true);
      }
    } catch { /* ignore */ }
    setIsLoading(false);
  }, []);

  /* ── login ─────────────────────────────────────────────────────────────── */
  const login = useCallback(async (email, password = "password123", roleOverride = null) => {
    setIsLoading(true);
    await fakeDelay(800);          // feels like a real network call

    const emailLow = (email || "").toLowerCase().trim();
    const demo = DEMO_ACCOUNTS[emailLow];

    // Accept ANY email — promote it to a role based on email prefix if unknown
    let resolvedRole = roleOverride || demo?.role;
    let resolvedName = demo?.name || email.split("@")[0].replace(/[._]/g, " ");

    // smart role inference from email domain/prefix
    if (!resolvedRole) {
      if (emailLow.includes("admin")) resolvedRole = "admin";
      else if (emailLow.includes("teacher")) resolvedRole = "teacher";
      else if (emailLow.includes("mentor")) resolvedRole = "mentor";
      else if (emailLow.includes("parent")) resolvedRole = "parent";
      else resolvedRole = "student";   // default: log in as student
    }

    const u = {
      id: `USR-${resolvedRole.slice(0, 2).toUpperCase()}-${Date.now()}`,
      name: resolvedName,
      email: email,
      role: resolvedRole,
      form_filled: true,
      avatar: null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    writeCookie(COOKIE_AUTH, `local-${Date.now()}`);
    writeCookie(COOKIE_ROLE, resolvedRole);

    setUser(u);
    setRole(resolvedRole);
    setIsAuth(true);
    setIsLoading(false);

    router.push(`/${resolvedRole}`);
  }, [router]);

  /* ── registerUser ──────────────────────────────────────────────────────── */
  const registerUser = useCallback(async ({ email, name, role: userRole, rollNumber, phone, relation }) => {
    await fakeDelay(900);

    // validate roll number exists in local db
    const linked = db.students.getByRollNo(rollNumber?.toUpperCase());
    if (!linked) throw new Error("Roll number not found. Check with your administrator.");

    const u = {
      id: `USR-${Date.now()}`,
      name,
      email,
      role: userRole,
      form_filled: false,   // will trigger FirstLoginDialog
      phone,
      rollNumber: rollNumber?.toUpperCase(),
      relation: userRole === "parent" ? relation : null,
      linkedStudentId: linked.id,
      linkedStudentName: linked.name,
      avatar: null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    writeCookie(COOKIE_AUTH, `local-${Date.now()}`);
    writeCookie(COOKIE_ROLE, userRole);

    setUser(u);
    setRole(userRole);
    setIsAuth(true);
    setIsLoading(false);

    return u;
  }, []);

  /* ── updateProfile ─────────────────────────────────────────────────────── */
  const updateProfile = useCallback((data) => {
    const updated = { ...user, ...data, form_filled: true };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { }
    setUser(updated);
  }, [user]);

  /* ── logout ────────────────────────────────────────────────────────────── */
  const logout = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
    clearCookie(COOKIE_AUTH);
    clearCookie(COOKIE_ROLE);
    setUser(null);
    setRole(null);
    setIsAuth(false);
    router.push("/login");
  }, [router]);

  return { user, role, isAuthenticated, isLoading, login, logout, registerUser, updateProfile };
}

export const useRole = () => {
  const { role } = useAuth();
  return role;
};
