// Calendly unified API handler

const CALENDLY_API_KEY = process.env.NEXT_PUBLIC_CALENDLY_API_KEY;
const CALENDLY_SCHEDULE_URL = process.env.NEXT_PUBLIC_CALENDLY_SCHEDULE_URL;
const CALENDLY_ORGANIZATION = process.env.NEXT_PUBLIC_CALENDLY_ORGANIZATION;

export async function getCalendlyAvailability(date) {
  if (!CALENDLY_API_KEY || !CALENDLY_SCHEDULE_URL) {
    return { error: "Calendly API key or schedule URL not set" };
  }
  const res = await fetch(`${CALENDLY_SCHEDULE_URL}/availability`, {
    headers: {
      Authorization: `Bearer ${CALENDLY_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return { error: "Failed to fetch from Calendly" };
  }
  const data = await res.json();
  return { slots: data.collection };
}
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

export async function bookCalendlyEvent({ event_type, start_time, invitee }) {
  if (!CALENDLY_API_KEY || !CALENDLY_ORGANIZATION) {
    return { error: "Calendly API key or organization not set" };
  }
  const res = await fetch("https://api.calendly.com/scheduled_events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CALENDLY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      organization: CALENDLY_ORGANIZATION,
      event_type,
      start_time,
      invitee,
    }),
  });
  if (!res.ok) {
    return { error: "Failed to book event in Calendly" };
  }
  const data = await res.json();
  return { calendly_event: data };
}
