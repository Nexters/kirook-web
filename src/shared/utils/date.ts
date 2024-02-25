export function toKRDateString(date: Date) {
  const year = date.toLocaleDateString('ko-KR', { year: 'numeric' });
  const month = date.toLocaleDateString('ko-KR', { month: '2-digit' });
  const day = date.toLocaleDateString('ko-KR', { day: '2-digit' });

  return `${year} ${month} ${day}`;
}
