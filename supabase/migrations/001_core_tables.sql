-- ==========================================
-- PHASE 10: CORE ACADEMIC SCHEMA (MIGRATION 001)
-- ==========================================

-- 1. Profiles (Base Identity)
-- Reference: auth.users is managed by Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  profile_photo_url TEXT,
  role TEXT CHECK (role IN ('admin','teacher','mentor','student','parent')) NOT NULL,
  form_filled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 2. Physical Structure
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  year INTEGER CHECK (year BETWEEN 1 AND 4) NOT NULL,
  division TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(branch_id, year, division)
);

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  year INTEGER CHECK (year BETWEEN 1 AND 4),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(code, branch_id, year)
);

-- 3. Actor Extensions
CREATE TABLE IF NOT EXISTS mentors (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  department TEXT,
  employee_id TEXT UNIQUE,
  student_count INTEGER DEFAULT 0 CHECK (student_count <= 20),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  department TEXT,
  employee_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  roll_number TEXT UNIQUE NOT NULL,
  class_id UUID REFERENCES classes(id),
  mentor_id UUID REFERENCES mentors(id),
  address TEXT,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  fee_status TEXT DEFAULT 'pending' CHECK (fee_status IN ('pending','partial','paid','overdue')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll_number);
CREATE INDEX IF NOT EXISTS idx_students_mentor ON students(mentor_id);

CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  relation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Utility: Automatic 'updated_at' management
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
