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


export function calculateAge(blockTime: any) {
  const blockTimeMillis = blockTime * 1000;
  const currentTimeMillis = Date.now();
  const ageMillis = currentTimeMillis - blockTimeMillis;
  const seconds = Math.floor(ageMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
