import React from 'react';

// Reliable, curated Unsplash imagery for Kerala destinations and categories
export const KERALA_IMAGE_FALLBACKS: Record<string, string> = {
  munnar: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
  thekkady: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80',
  alleppey: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
  kovalam: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  varkala: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  kochi: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  vagamon: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  kanyakumari: 'https://images.unsplash.com/photo-1610902552120-c577dbde88a8?auto=format&fit=crop&w=1200&q=80',
  cab: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  taxi: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  resort: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  houseboat: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
};

/**
 * Handle image error safely with zero infinite loop risk.
 * Replaces broken external URLs with a reliable Kerala tourism photo.
 */
export const handleImageFallback = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  keyOrUrl?: string
) => {
  const target = e.currentTarget;
  if (!target) return;

  // Prevent infinite loop if fallback also fails
  if (target.dataset.fallbackApplied === 'true') {
    return;
  }

  target.dataset.fallbackApplied = 'true';

  if (!keyOrUrl) {
    target.src = KERALA_IMAGE_FALLBACKS.default;
    return;
  }

  // If key matches one of our destination identifiers
  const normalizedKey = keyOrUrl.toLowerCase().trim();
  if (KERALA_IMAGE_FALLBACKS[normalizedKey]) {
    target.src = KERALA_IMAGE_FALLBACKS[normalizedKey];
    return;
  }

  // If it's a direct URL
  if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
    target.src = keyOrUrl;
    return;
  }

  // Check substring matches
  for (const [k, url] of Object.entries(KERALA_IMAGE_FALLBACKS)) {
    if (normalizedKey.includes(k)) {
      target.src = url;
      return;
    }
  }

  target.src = KERALA_IMAGE_FALLBACKS.default;
};
