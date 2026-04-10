import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import * as dummyData from '@/lib/dummy-data'

/**
 * createClient (Neural Link Initializer)
 * Optimized for production resilience and practical demo-ability.
 * In Configuration Gap mode (no .env), it returns a Mock Proxy that simulates the Supabase grid.
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Configuration Gap Detection: Fallback to Mock Proxy
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.startsWith('your-')) {
    console.warn("TAMS: Grid Credentials Missing. Initializing Resilient Mock Proxy.");

    const createMockQuery = (tableName) => {
      // Semantic Mapping: Map DB tables to dummy data exports
      const tableMap = {
        'profiles': dummyData.students, // fallback
        'students': dummyData.students,
        'teachers': dummyData.teachers,
        'mentors': dummyData.mentors,
        'branches': dummyData.branches,
        'classes': dummyData.classes,
        'subjects': dummyData.subjects || [],
        'attendance': dummyData.studentAttendanceLog,
        'notifications': [],
        'messages': dummyData.messageThreads,
        'parents': dummyData.parents || [dummyData.parentProfile],
        'fees': dummyData.feeRecords || [],
        'test_marks': dummyData.studentTestScores || [],

      };

      const sourceData = tableMap[tableName] || dummyData[tableName] || [];

      const result = Promise.resolve({
        data: sourceData,
        count: sourceData.length,
        error: null
      });

      const chain = {
        then: (resolve, reject) => result.then(resolve, reject),
        select: () => chain,
        eq: () => chain,
        in: () => chain,
        order: () => chain,
        limit: () => chain,
        single: () => Promise.resolve({ data: (dummyData[tableName] || [])[0], error: null }),
        update: () => chain,
        insert: () => chain,
        delete: () => chain
      };

      return chain;
    };

    return {
      auth: {
        getUser: async () => {
          const userStr = cookieStore.get('TAMS-user')?.value;
          if (!userStr) return { data: { user: null }, error: null };
          try {
            const user = JSON.parse(decodeURIComponent(userStr));
            return { data: { user: { ...user, user_metadata: { role: user.role } } }, error: null };
          } catch {
            return { data: { user: null }, error: null };
          }
        }
      },
      from: (table) => createMockQuery(table)
    };
  }

  // 2. Standard Production Grid Connection
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  )
}
