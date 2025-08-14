import { format, parse } from 'date-fns';

export const formatTime = (timeString) => {
    const padded = timeString.padStart(4, '0'); // e.g., "800" → "0800"
    const parsed = parse(padded, 'HHmm', new Date());
    return format(parsed, 'h:mm a'); // → "8:00 AM", "7:00 PM"
}