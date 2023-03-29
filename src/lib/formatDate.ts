// date: yyyy-MM-ddTHH:mm:ss
export default function formatDate(dateString: string): string {
  const MINUTE_MS = 60 * 1000
  const HOUR_MS = 60 * MINUTE_MS
  const DAY_MS = 24 * HOUR_MS

  const date = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / DAY_MS)
  const diffHours = Math.floor(diffMs / HOUR_MS)
  const diffMinutes = Math.floor(diffMs / MINUTE_MS)

  if (diffMs < MINUTE_MS) {
    return '방금 전'
  } else if (diffMs < HOUR_MS) {
    return `${diffMinutes}분 전`
  } else if (diffMs < DAY_MS) {
    return `${diffHours}시간 전`
  } else if (diffDays <= 30) {
    return `${diffDays}일 전`
  } else {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
