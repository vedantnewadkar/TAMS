-- ==========================================
-- PHASE 10: ROW LEVEL SECURITY (MIGRATION 003)
-- ==========================================

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 2. Base Profile Policies
-- Authenticated users can read their own profile
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 3. Student Policies
-- Students can only view their own student record
CREATE POLICY "Students can view their own record" 
ON students FOR SELECT 
USING (id = auth.uid());

-- Parents can view their ward's student record
CREATE POLICY "Parents can view their ward's record" 
ON students FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM parents 
    WHERE id = auth.uid() AND student_id = students.id
  )
);

-- 4. Academic Policies (Attendance/Marks)
-- Students can view their own attendance
CREATE POLICY "Students can view their own attendance" 
ON attendance FOR SELECT 
USING (student_id = auth.uid());

-- Teachers can manage attendance for classes they teach
CREATE POLICY "Teachers can manage attendance" 
ON attendance FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM teacher_subjects 
    WHERE teacher_id = auth.uid() AND class_id = attendance.class_id
  )
);

-- 5. Financial Policies (Fees)
-- Students/Parents can view their own fees
CREATE POLICY "Users can view their own fees" 
ON fees FOR SELECT 
USING (
  student_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM parents 
    WHERE id = auth.uid() AND student_id = fees.student_id
  )
);

-- 6. Messaging Policies
-- Users can view threads they are part of
CREATE POLICY "Users can view their own threads" 
ON message_threads FOR SELECT 
USING (initiator_id = auth.uid() OR receiver_id = auth.uid());

-- Users can view messages in their threads
CREATE POLICY "Users can view messages in their threads" 
ON messages FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM message_threads 
    WHERE id = messages.thread_id AND (initiator_id = auth.uid() OR receiver_id = auth.uid())
  )
);
