/**
 * Helper để lọc task theo ngày
 * MongoDB lưu createdAt theo UTC
 * Chúng ta so sánh ngày mà không tính offset
 */

export const buildVNDateRange = (dateStr) => {
  // Parse string date YYYY-MM-DD
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JS month is 0-11
  const day = parseInt(parts[2], 10);

  // Lấy ngày bắt đầu (00:00:00 UTC)
  const startDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

  // Lấy ngày kết thúc (23:59:59 UTC)
  const endDate = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

  return { startDate, endDate };
};

/**
 * Lấy range cho "hôm nay" theo giờ UTC
 */
export const getTodayVNRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  const startDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

  return { startDate, endDate };
};

/**
 * Lấy range cho tuần này theo giờ UTC
 */
export const getWeekVNRange = () => {
  const now = new Date();
  const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000); // Convert to UTC

  const dayOfWeek = utcDate.getDay();
  const diff = utcDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday

  const startDate = new Date(
    Date.UTC(utcDate.getFullYear(), utcDate.getMonth(), diff, 0, 0, 0, 0)
  );

  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 6);
  endDate.setUTCHours(23, 59, 59, 999);

  return { startDate, endDate };
};

/**
 * Lấy range cho tháng này theo giờ UTC
 */
export const getMonthVNRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  return { startDate, endDate };
};
