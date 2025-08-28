-- Add address column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;

-- Add city column to profiles table  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;

-- Update RLS policies to include new columns (if needed)
-- The existing policies should automatically include new columns