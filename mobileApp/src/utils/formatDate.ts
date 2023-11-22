import { format } from 'date-fns';

export const formatDateWithHour = (date: Date) =>
  format(new Date(date), 'yyyy-MM-dd HH:mm');

export const formatDate = (date: Date) => format(new Date(date), 'yyyy-MM-dd');
