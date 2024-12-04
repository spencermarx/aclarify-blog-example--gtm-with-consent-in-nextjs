"use client";

export const IS_GTM_ENABLED =
  process.env.NEXT_PUBLIC_GTM_ID !== undefined &&
  process.env.NEXT_PUBLIC_GTM_ID !== "";

export const trackingConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  cookieBannerCookieName: "cookieConsent",
};
