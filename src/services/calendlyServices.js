// Calendly API service functions

const CALENDLY_API_BASE = "https://api.calendly.com";

/**
 * Get available times for a specific event type and date range
 * @param {string} eventTypeUri - The URI of the event type
 * @param {string} startTime - Start time in ISO format
 * @param {string} endTime - End time in ISO format
 * @param {string} accessToken - Calendly access token
 * @returns {Promise<Object>} Available times response
 */
export async function getAvailableTimes(
  eventTypeUri,
  startTime,
  endTime,
  accessToken
) {
  const params = new URLSearchParams({
    event_type: eventTypeUri,
    start_time: startTime,
    end_time: endTime,
  });

  const response = await fetch(
    `${CALENDLY_API_BASE}/event_type_available_times?${params}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch available times: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

/**
 * Get user's event types
 * @param {string} userUri - The URI of the user
 * @param {string} accessToken - Calendly access token
 * @returns {Promise<Object>} Event types response
 */
export async function getEventTypes(userUri, accessToken) {
  const params = new URLSearchParams({
    user: userUri,
  });

  const response = await fetch(`${CALENDLY_API_BASE}/event_types?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch event types: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

/**
 * Get current user information
 * @param {string} accessToken - Calendly access token
 * @returns {Promise<Object>} User information response
 */
export async function getCurrentUser(accessToken) {
  const response = await fetch(`${CALENDLY_API_BASE}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user info: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

/**
 * Format date for Calendly API (ISO 8601 format)
 * @param {Date} date - JavaScript Date object
 * @returns {string} Formatted date string
 */
export function formatDateForAPI(date) {
  return date.toISOString();
}

/**
 * Get start and end of day for a given date
 * @param {Date} date - JavaScript Date object
 * @returns {Object} Object with startTime and endTime
 */
export function getDayRange(date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    startTime: formatDateForAPI(startOfDay),
    endTime: formatDateForAPI(endOfDay),
  };
}
