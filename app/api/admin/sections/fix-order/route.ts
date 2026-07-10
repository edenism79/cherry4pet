import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()

    console.log('🔧 Starting section reorder...')

    // Update each section one by one with explicit sort_order
    const updates = [
      { section_key: 'hero', sort_order: 1, title: '체리포펫' },
      { section_key: 'why_pet', sort_order: 2, title: '왜 반려동물 전용 기부 플랫폼이 필요한가요?' },
      { section_key: 'rabies_campaign', sort_order: 3, title: 'CHERRY for PET 첫 런칭 캠페인' },
      { section_key: 'how_it_works', sort_order: 4, title: '어떻게 작동하나요?' },
      { section_key: 'transparency', sort_order: 5, title: '투명성이 우리의 약속입니다' },
      { section_key: 'cherry_photo', sort_order: 6, title: 'CHERRY Photo for PET' },
      { section_key: 'impact', sort_order: 7, title: '우리가 만드는 변화' },
      { section_key: 'partners', sort_order: 8, title: '함께하는 파트너' },
      { section_key: 'final_cta', sort_order: 9, title: '작은 참여가 한 생명을 지킵니다' },
    ]

    const results = []

    for (const item of updates) {
      const { data, error } = await supabase
        .from('landing_sections')
        .update({
          sort_order: item.sort_order,
          updated_at: new Date().toISOString()
        })
        .eq('section_key', item.section_key)
        .select()

      if (error) {
        console.error(`❌ Error updating ${item.section_key}:`, error)
        results.push({ section_key: item.section_key, error: error.message })
      } else {
        console.log(`✅ Updated ${item.section_key} to sort_order ${item.sort_order}`)
        results.push({ section_key: item.section_key, success: true, data })
      }
    }

    // Update impact body text
    const { error: bodyError } = await supabase
      .from('landing_sections')
      .update({ body: '여러분의 참여로 만들어질 목표입니다' })
      .eq('section_key', 'impact')
      .is('body', null)

    if (bodyError) {
      console.error('❌ Error updating impact body:', bodyError)
    } else {
      console.log('✅ Impact body updated')
    }

    // Also try empty string
    await supabase
      .from('landing_sections')
      .update({ body: '여러분의 참여로 만들어질 목표입니다' })
      .eq('section_key', 'impact')
      .eq('body', '')

    // Verify final order
    const { data: finalSections } = await supabase
      .from('landing_sections')
      .select('section_key, title, sort_order')
      .order('sort_order', { ascending: true })

    console.log('📋 Final order:', finalSections)

    return NextResponse.json({
      success: true,
      message: 'Section order updated',
      updateResults: results,
      finalOrder: finalSections
    })
  } catch (error) {
    console.error('❌ Fatal error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
