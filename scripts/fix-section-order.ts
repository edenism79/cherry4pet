/**
 * Fix section order in database
 * Run with: node scripts/fix-section-order.js
 */

async function fixSectionOrder() {
  console.log('🔧 Fixing section order via API...\n')

  try {
    // Call our API to update sections
    const impactResponse = await fetch('http://localhost:3000/api/admin/sections', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_key: 'impact',
        sort_order: 7,
        body: '여러분의 참여로 만들어질 목표입니다'
      })
    })

    if (!impactResponse.ok) {
      console.error('❌ Failed to update impact section')
      return
    }
    console.log('✅ Impact section moved to position 7')

    const partnersResponse = await fetch('http://localhost:3000/api/admin/sections', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_key: 'partners',
        sort_order: 8
      })
    })

    if (!partnersResponse.ok) {
      console.error('❌ Failed to update partners section')
      return
    }
    console.log('✅ Partners section moved to position 8')

    console.log('\n✅ Section order fixed successfully!')
    console.log('   6. cherry_photo')
    console.log('   7. impact')
    console.log('   8. partners')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

fixSectionOrder()
