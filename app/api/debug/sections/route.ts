import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: sections, error } = await supabase
      .from('landing_sections')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      count: sections?.length || 0,
      sections: sections?.map(s => ({
        section_key: s.section_key,
        title: s.title,
        body: s.body,
        has_extra: !!s.extra,
        extra_keys: s.extra ? Object.keys(s.extra) : []
      }))
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
