export function formatUTCDate(blockTime: any): string {
  const blockTimeMillis = blockTime * 1000;
  const date = new Date(blockTimeMillis);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
    timeZoneName: 'short',
  };
  const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
  return formattedDate.replace(' UTC', ' UTC');
}
