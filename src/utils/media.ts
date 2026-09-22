import React, { useState, useEffect } from 'react';

/**
 * Resolves media URLs for photos and videos.
 * Uses local bundled high-performance assets directly for instant, zero-lag loading without network timeouts.
 */
export const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1e2f4'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23812392'/%3E%3Cpath d='M20 86c0-16 14-26 30-26s30 10 30 26z' fill='%23531062'/%3E%3C/svg%3E";

const REGIS_DEFAULT_PHOTO = '/media/regislane-da-silva.jpg';
const REGIS_STORAGE_KEY = 'regis_custom_photo_url';

export function getRegisPhotoUrl(): string {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(REGIS_STORAGE_KEY);
      if (stored) return stored;
    } catch {
      // ignore localStorage errors
    }
  }
  return REGIS_DEFAULT_PHOTO;
}

export function setRegisPhotoUrl(url: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(REGIS_STORAGE_KEY, url);
    } catch {
      // ignore localStorage errors
    }
    window.dispatchEvent(new CustomEvent('regis-photo-updated', { detail: url }));
  }
}

export function resetRegisPhotoUrl(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(REGIS_STORAGE_KEY);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('regis-photo-updated', { detail: REGIS_DEFAULT_PHOTO }));
  }
}

export function useRegisPhoto(): string {
  const [photoUrl, setPhotoUrl] = useState<string>(() => getRegisPhotoUrl());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setPhotoUrl(customEvent.detail || getRegisPhotoUrl());
    };

    window.addEventListener('regis-photo-updated', handleUpdate);
    return () => window.removeEventListener('regis-photo-updated', handleUpdate);
  }, []);

  return photoUrl;
}

export function getMediaUrl(mediaKey: string): string {
  if (!mediaKey) return DEFAULT_AVATAR;
  if (mediaKey.startsWith('data:') || mediaKey.startsWith('blob:') || mediaKey.startsWith('http://') || mediaKey.startsWith('https://')) {
    return mediaKey;
  }
  if (mediaKey.includes('regislane')) {
    return getRegisPhotoUrl();
  }
  if (mediaKey.startsWith('story-')) {
    return `/media/${mediaKey}.mp4`;
  }
  return `/media/${mediaKey}?v=2`;
}

/**
 * Robust fallback image handler that guarantees NO recursive error loops.
 * Sets target.onerror = null immediately to prevent browser tab locking / freezing.
 */
export function handleImageFallback(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  secondarySrc?: string
): void {
  const target = e.currentTarget;
  target.onerror = null;
  if (secondarySrc && target.src !== secondarySrc && !target.src.endsWith(secondarySrc)) {
    target.src = secondarySrc;
    target.onerror = () => {
      target.onerror = null;
      target.src = DEFAULT_AVATAR;
    };
  } else {
    target.src = DEFAULT_AVATAR;
  }
}

export function getLocalFallbackMediaUrl(mediaKey: string): string {
  if (!mediaKey) return DEFAULT_AVATAR;
  return `/media/${mediaKey}?v=2`;
}

export function getVideoThumbnailUrl(mediaKey: string): string {
  if (!mediaKey) return DEFAULT_AVATAR;
  return `/media/thumb-${mediaKey}.jpg`;
}
