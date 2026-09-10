import { COMPANY_DETAILS } from '../data/travelData';

export interface TripEnquiryData {
  guestName: string;
  phone: string;
  travelMonth?: string;
  nights: number;
  adults: number;
  children: number;
  destinations: string;
  hotelTier: string;
  vehicle: string;
  inclusions: string;
  specialNote?: string;
  packageTitle?: string;
  estimatedBudget?: string;
  timestamp?: string;
}

/**
 * Submits trip enquiry data to an optional Google Sheets Webhook (Google Apps Script).
 * Also archives enquiries in localStorage as a backup.
 */
export async function submitTripEnquiry(data: TripEnquiryData): Promise<{ success: boolean; error?: string }> {
  const payload = {
    ...data,
    timestamp: data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  // 1. Always save in browser localStorage backup
  try {
    const existingRaw = localStorage.getItem('travelcare_enquiries');
    const existing: TripEnquiryData[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(payload);
    localStorage.setItem('travelcare_enquiries', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not store local backup of enquiry:', err);
  }

  // 2. Send to Google Sheet Webhook if configured
  const webhookUrl =
    (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK_URL ||
    COMPANY_DETAILS.googleSheetWebhookUrl;

  if (!webhookUrl || !webhookUrl.trim()) {
    // Webhook not configured yet, silently succeed with local persistence
    return { success: true };
  }

  try {
    // Use mode: 'no-cors' so that Google Apps Script 302 redirects are executed cleanly without CORS block
    await fetch(webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err: any) {
    console.warn('Failed to send enquiry to Google Sheet webhook:', err);
    return { success: false, error: err?.message || 'Failed to sync with Google Sheet' };
  }
}
