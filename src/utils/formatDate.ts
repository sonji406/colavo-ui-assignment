function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const meridiem = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12;

  return `${year}. ${month}. ${day}. ${meridiem} ${hour12}:${minutes}`;
}

export default formatDate;
