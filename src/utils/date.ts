// Date → "2026-10-02"（端末のタイムゾーン基準）
export function toDateString(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

// 今日から n 日前の日付 → "2026-10-01"
export function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toDateString(d)
}

// "2026-10-02" → "10月2日(金)"
export function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  const weekday = '日月火水木金土'[d.getDay()]
  return `${d.getMonth() + 1}月${d.getDate()}日(${weekday})`
}
