import { Client } from "@upstash/qstash";
const client = new Client({ token: process.env.NEXT_PUBLIC_QSTASH_TOKEN });

export async function saveToQstash({ name, time, service }) {
  try {
    const QSTASH_URL = process.env.NEXT_PUBLIC_QSTASH_URL;
    const QSTASH_TOKEN = process.env.NEXT_PUBLIC_QSTASH_TOKEN;
    if (!QSTASH_URL || !QSTASH_TOKEN) {
      throw new Error("QStash config missing");
    }
    const meetingDate = new Date(time);
    if (isNaN(meetingDate.getTime())) {
      throw new Error("Meeting time is invalid!");
    }
    const reminderDate = new Date(meetingDate.getTime() - 60 * 60 * 1000); // قبلها بساعة
    const unixTimestamp = Math.floor(reminderDate.getTime() / 1000);
    const result = await client.publishJSON({
      url: QSTASH_URL,
      body: {
        name,
        time,
        service,
      },
      headers: {
        "Upstash-Not-Before": unixTimestamp,
      },
    });
    return result;
  } catch (e) {
    throw new Error(e?.message || "Server error");
  }
}
