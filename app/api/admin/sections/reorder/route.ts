import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()

    // New order:
    // 1. hero (no change)
    // 2. why_pet (was 3)
    // 3. rabies_campaign (was 2)
    // 4. how_it_works (no change) - but campaigns component goes here in page.tsx
    // 5. transparency (was 5)
    // 6. cherry_photo (was 6)
    // 7. impact (was 8)
    // 8. partners (was 7)
    // 9. final_cta (was 9)

    // Move all to temp positions first
    await supabase.from('landing_sections').update({ sort_order: 102 }).eq('section_key', 'why_pet')
    await supabase.from('landing_sections').update({ sort_order: 103 }).eq('section_key', 'rabies_campaign')
    await supabase.from('landing_sections').update({ sort_order: 107 }).eq('section_key', 'impact')
    await supabase.from('landing_sections').update({ sort_order: 108 }).eq('section_key', 'partners')

    // Now set final positions
    await supabase.from('landing_sections').update({ sort_order: 2, updated_at: new Date().toISOString() }).eq('section_key', 'why_pet')
    await supabase.from('landing_sections').update({ sort_order: 3, updated_at: new Date().toISOString() }).eq('section_key', 'rabies_campaign')
    await supabase.from('landing_sections').update({ sort_order: 7, updated_at: new Date().toISOString() }).eq('section_key', 'impact')
    await supabase.from('landing_sections').update({ sort_order: 8, updated_at: new Date().toISOString() }).eq('section_key', 'partners')

    // Update impact body text if empty
    await supabase
      .from('landing_sections')
      .update({ body: '여러분의 참여로 만들어질 목표입니다' })
      .eq('section_key', 'impact')
      .or('body.is.null,body.eq.')

    // Get updated order
    const { data: sections } = await supabase
      .from('landing_sections')
      .select('section_key, title, sort_order')
      .order('sort_order', { ascending: true })

    return NextResponse.json({
      success: true,
      message: 'Section order updated successfully',
      order: '1.hero → 2.why_pet → 3.rabies_campaign → 4.how_it_works → 5.transparency → 6.cherry_photo → 7.impact → 8.partners → 9.final_cta',
      sections
    })
  } catch (error) {
    console.error('Error reordering sections:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
