export async function checkUrlAndNavigate(url: string, onNotFound: () => void) {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
    // With no-cors, we can't check status, so just navigate
    window.location.href = url
  } catch (error) {
    // If fetch fails, check if it's a 404 by trying a full request
    try {
      const response = await fetch(url)
      if (response.status === 404 || response.status === 500) {
        onNotFound()
      } else {
        window.location.href = url
      }
    } catch {
      // If all fails, show coming soon
      onNotFound()
    }
  }
}
