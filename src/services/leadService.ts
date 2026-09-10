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
    // Append URL parameters as fallback so Google Apps Script handles e.parameter or e.postData
    const params = new URLSearchParams({
      guestName: payload.guestName,
      phone: payload.phone,
      travelMonth: payload.travelMonth || '',
      nights: String(payload.nights),
      adults: String(payload.adults),
      children: String(payload.children || 0),
      destinations: payload.destinations,
      hotelTier: payload.hotelTier,
      vehicle: payload.vehicle,
      inclusions: payload.inclusions,
      specialNote: payload.specialNote || '',
      packageTitle: payload.packageTitle || '',
      timestamp: payload.timestamp,
    });

    const cleanUrl = webhookUrl.trim();
    const endpointWithParams = cleanUrl.includes('?')
      ? `${cleanUrl}&${params.toString()}`
      : `${cleanUrl}?${params.toString()}`;

    // Use mode: 'no-cors' with text/plain so that browser sends without preflight CORS rejection
    await fetch(endpointWithParams, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err: any) {
    console.warn('Failed to send enquiry to Google Sheet webhook:', err);
    return { success: false, error: err?.message || 'Failed to sync with Google Sheet' };
  }
}
