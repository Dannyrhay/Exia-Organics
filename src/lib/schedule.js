// Date-window checks for things the admin schedules in the dashboard (promos, sales).
// The site is static, so these run in the visitor's browser: a promo appears and
// disappears at its start/end time without anyone needing to republish.

const toDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
};

/** True when `item` is switched on and `now` falls between its optional start and end. */
export function isLive(item, now = new Date()) {
    if (!item?.enabled) return false;
    const start = toDate(item.start);
    const end = toDate(item.end);
    if (start && now < start) return false;
    if (end && now >= end) return false;
    return true;
}

/** The end of a window as a Date, or null when it has none. */
export const endsAt = (item) => toDate(item?.end);

/** True when a date is set and already in the past. */
export const hasPassed = (value, now = new Date()) => {
    const d = toDate(value);
    return Boolean(d && now >= d);
};
