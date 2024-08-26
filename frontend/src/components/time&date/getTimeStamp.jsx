import React from 'react';
import { format, formatDistanceToNowStrict, isToday } from 'date-fns';

const getTimeStamp = ( timestamp ) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date)) {
        return 'Invalid date';
      }

    if (isToday(date)) {
      return format(date, 'hh:mm a'); // 'hh:mm AM/PM'
    } else {
      return formatDistanceToNowStrict(date, { addSuffix: true });
    }
  };

  return <span>{formatTimestamp(timestamp)}</span>;
};

export default getTimeStamp;
