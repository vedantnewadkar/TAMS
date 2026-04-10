/**
 * TAMS Local Database (localStorage-backed)
 * Pretends to be a real DB — seeds from dummy-data, persists changes per session.
 * 100% client-side. No network. No Supabase. Hackathon-ready.
 */

import {
  students as seedStudents,
  teachers as seedTeachers,
  mentors as seedMentors,
  parents as seedParents,
  branches as seedBranches,
  classes as seedClasses,
  subjects as seedSubjects,
  feeRecords as seedFees,
  activities as seedActivities,
  messageThreads as seedMessages,
  progressNotes as seedNotes,
  studentAttendanceLog as seedAttendance,
  studentTestScores as seedTestScores,
  teacherSchedule as seedSchedule,
  teacherTests as seedTests,
  doubtThreads as seedDoubts,
  parentThreads as seedParentThreads,
  parentProfile as seedParentProfile,
} from "@/lib/dummy-data";

const KEYS = {
  students: "ec_students",
  teachers: "ec_teachers",
  mentors: "ec_mentors",
  parents: "ec_parents",
  branches: "ec_branches",
  classes: "ec_classes",
  subjects: "ec_subjects",
  fees: "ec_fees",
  activities: "ec_activities",
  messages: "ec_messages",
  notes: "ec_notes",
  attendance: "ec_attendance",
  testScores: "ec_test_scores",
  schedule: "ec_schedule",
  tests: "ec_tests",
  doubts: "ec_doubts",
  parentThreads: "ec_parent_threads",
  seeded: "ec_seeded_v2",
};

function get(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { }
}

/** Seed the local DB from dummy data (only once per session) */
export function seedIfNeeded() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(KEYS.seeded)) return;

  set(KEYS.students, seedStudents);
  set(KEYS.teachers, seedTeachers);
  set(KEYS.mentors, seedMentors);
  set(KEYS.parents, seedParents);
  set(KEYS.branches, seedBranches);
  set(KEYS.classes, seedClasses);
  set(KEYS.subjects, seedSubjects || []);
  set(KEYS.fees, seedFees || []);
  set(KEYS.activities, seedActivities || []);
  set(KEYS.messages, seedMessages || []);
  set(KEYS.notes, seedNotes || []);
  set(KEYS.attendance, seedAttendance || []);
  set(KEYS.testScores, seedTestScores || []);
  set(KEYS.schedule, seedSchedule || []);
  set(KEYS.tests, seedTests || []);
  set(KEYS.doubts, seedDoubts || []);
  set(KEYS.parentThreads, seedParentThreads || []);

  localStorage.setItem(KEYS.seeded, "1");
}

/** Reset DB (re-seeds from dummy data) */
export function resetDb() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

// ─── Collections (simulates tables) ───────────────────────────────────────────

export const db = {
  students: {
    getAll: () => get(KEYS.students, seedStudents),
    getById: (id) => get(KEYS.students, seedStudents).find(s => s.id === id),
    getByRollNo: (roll) => get(KEYS.students, seedStudents).find(s => s.rollNo === roll),
    add: (student) => {
      const all = get(KEYS.students, seedStudents);
      const newStudent = { id: `S-${Date.now()}`, ...student };
      set(KEYS.students, [...all, newStudent]);
      return newStudent;
    },
    update: (id, data) => {
      const all = get(KEYS.students, seedStudents);
      const updated = all.map(s => s.id === id ? { ...s, ...data } : s);
      set(KEYS.students, updated);
      return updated.find(s => s.id === id);
    },
    remove: (id) => {
      const all = get(KEYS.students, seedStudents);
      set(KEYS.students, all.filter(s => s.id !== id));
    },
    count: () => get(KEYS.students, seedStudents).length,
  },

  teachers: {
    getAll: () => get(KEYS.teachers, seedTeachers),
    getById: (id) => get(KEYS.teachers, seedTeachers).find(t => t.id === id),
    add: (teacher) => {
      const all = get(KEYS.teachers, seedTeachers);
      const newT = { id: `T-${Date.now()}`, ...teacher };
      set(KEYS.teachers, [...all, newT]);
      return newT;
    },
    count: () => get(KEYS.teachers, seedTeachers).length,
  },

  mentors: {
    getAll: () => get(KEYS.mentors, seedMentors),
    getById: (id) => get(KEYS.mentors, seedMentors).find(m => m.id === id),
    count: () => get(KEYS.mentors, seedMentors).length,
  },

  parents: {
    getAll: () => get(KEYS.parents, seedParents),
    getByWardRoll: (roll) => get(KEYS.parents, seedParents).find(p => p.wardRollNo === roll),
    count: () => get(KEYS.parents, seedParents).length,
  },

  branches: {
    getAll: () => get(KEYS.branches, seedBranches),
  },

  classes: {
    getAll: () => get(KEYS.classes, seedClasses),
    count: () => get(KEYS.classes, seedClasses).length,
  },

  subjects: {
    getAll: () => get(KEYS.subjects, seedSubjects || []),
  },

  fees: {
    getAll: () => get(KEYS.fees, seedFees || []),
    getByStudent: (studentId) => {
      const all = get(KEYS.fees, seedFees || []);
      return all.find(f => f.studentId === studentId);
    },
    update: (studentId, data) => {
      const all = get(KEYS.fees, seedFees || []);
      const updated = all.map(f => f.studentId === studentId ? { ...f, ...data } : f);
      set(KEYS.fees, updated);
    },
    getOverdue: () => get(KEYS.fees, seedFees || []).filter(f => f.status === "overdue" || f.status === "pending"),
  },

  activities: {
    getAll: () => get(KEYS.activities, seedActivities || []),
    add: (activity) => {
      const all = get(KEYS.activities, seedActivities || []);
      const newA = { id: Date.now(), timestamp: "Just now", ...activity };
      set(KEYS.activities, [newA, ...all].slice(0, 50)); // keep last 50
      return newA;
    },
  },

  messages: {
    getAll: () => get(KEYS.messages, seedMessages || []),
    getById: (id) => get(KEYS.messages, seedMessages || []).find(m => m.id === id),
    markRead: (id) => {
      const all = get(KEYS.messages, seedMessages || []);
      set(KEYS.messages, all.map(m => m.id === id ? { ...m, isRead: true } : m));
    },
    add: (msg) => {
      const all = get(KEYS.messages, seedMessages || []);
      const newMsg = { id: `TH-${Date.now()}`, timestamp: "Just now", isRead: false, status: "open", ...msg };
      set(KEYS.messages, [newMsg, ...all]);
      return newMsg;
    },
    reply: (threadId, reply) => {
      const all = get(KEYS.messages, seedMessages || []);
      set(KEYS.messages, all.map(m =>
        m.id === threadId
          ? { ...m, lastMessage: reply, isRead: false, timestamp: "Just now" }
          : m
      ));
    },
  },

  notes: {
    getAll: () => get(KEYS.notes, seedNotes || []),
    getByStudent: (studentId) => get(KEYS.notes, seedNotes || []).filter(n => n.studentId === studentId),
    add: (note) => {
      const all = get(KEYS.notes, seedNotes || []);
      const newNote = { id: Date.now(), date: new Date().toISOString().split("T")[0], ...note };
      set(KEYS.notes, [newNote, ...all]);
      return newNote;
    },
  },

  attendance: {
    getAll: () => get(KEYS.attendance, seedAttendance || []),
    mark: (records) => {
      const all = get(KEYS.attendance, seedAttendance || []);
      set(KEYS.attendance, [...records, ...all]);
    },
  },

  testScores: {
    getAll: () => get(KEYS.testScores, seedTestScores || []),
    add: (score) => {
      const all = get(KEYS.testScores, seedTestScores || []);
      const newScore = { id: Date.now(), ...score };
      set(KEYS.testScores, [...all, newScore]);
      return newScore;
    },
  },

  schedule: {
    getAll: () => get(KEYS.schedule, seedSchedule || []),
    markAttendance: (id) => {
      const all = get(KEYS.schedule, seedSchedule || []);
      set(KEYS.schedule, all.map(s => s.id === id ? { ...s, status: "marked" } : s));
    },
  },

  tests: {
    getAll: () => get(KEYS.tests, seedTests || []),
    add: (test) => {
      const all = get(KEYS.tests, seedTests || []);
      const newTest = { id: `T-${Date.now()}`, ...test };
      set(KEYS.tests, [...all, newTest]);
      return newTest;
    },
  },

  doubts: {
    getAll: () => get(KEYS.doubts, seedDoubts || []),
    add: (doubt) => {
      const all = get(KEYS.doubts, seedDoubts || []);
      const newD = { id: `DB-${Date.now()}`, timestamp: "Just now", status: "open", unread: 0, ...doubt };
      set(KEYS.doubts, [newD, ...all]);
      return newD;
    },
    close: (id) => {
      const all = get(KEYS.doubts, seedDoubts || []);
      set(KEYS.doubts, all.map(d => d.id === id ? { ...d, status: "resolved" } : d));
    },
  },

  parentThreads: {
    getAll: () => get(KEYS.parentThreads, seedParentThreads || []),
    markRead: (id) => {
      const all = get(KEYS.parentThreads, seedParentThreads || []);
      set(KEYS.parentThreads, all.map(t => t.id === id ? { ...t, isRead: true } : t));
    },
  },
};

// ─── Stats helper ─────────────────────────────────────────────────────────────
export function getStats() {
  return {
    students: db.students.count(),
    teachers: db.teachers.count(),
    mentors: db.mentors.count(),
    parents: db.parents.count(),
    classes: db.classes.count(),
    pendingFees: db.fees.getOverdue().length,
  };
}

// ─── Fake async delay (makes it feel like a real API) ─────────────────────────
export async function fakeDelay(ms = 300) {
  return new Promise(r => setTimeout(r, ms));
}
