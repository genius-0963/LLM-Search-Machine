import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Generate embedding for the search query
    const embeddingResponse = await supabaseClient.functions.invoke('generate-embedding', {
      body: { text: query }
    });

    if (!embeddingResponse.data) {
      throw new Error('Failed to generate embedding');
    }

    const { embedding } = embeddingResponse.data;

    // Perform similarity search
    const { data: products, error } = await supabaseClient.rpc('match_products', {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 10
    });

    if (error) throw error;

    return new Response(
      JSON.stringify(products),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});