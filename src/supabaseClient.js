import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cedotdtuyqhesfmxsosk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZG90ZHR1eXFoZXNmbXhzb3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNjAyNTIsImV4cCI6MjA3NjczNjI1Mn0.ZTnyCIyPy-QcmJv2PigcLAyV4AlGmsyAu3OacczSTkY';

export const supabase = createClient(supabaseUrl, supabaseKey);
