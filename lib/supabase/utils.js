/**
 * Supabase Utility Helpers
 */

export const handleSupabaseError = (error) => {
  if (!error) return null;
  
  console.error("Supabase Operation Failure:", error);
  
  // Map specific error codes to user-friendly messages
  if (error.code === 'PGRST116') return "Node not found.";
  if (error.code === '23505') return "Parameter duplication detected (Unique constraint violation).";
  if (error.code === '42501') return "Insufficient permissions for this neural signal.";
  
  return error.message || "An unexpected database synchronization error occurred.";
};

/**
 * Upload a file to a specific Supabase Storage bucket
 */
export const uploadFile = async (supabase, bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw new Error(handleSupabaseError(error));
  return data;
};

/**
 * Generate a public URL for a file in a public bucket
 */
export const getPublicUrl = (supabase, bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return data.publicUrl;
};
