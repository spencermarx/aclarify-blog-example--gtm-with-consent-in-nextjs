"use client";

import { IS_GTM_ENABLED, trackingConfig } from "./config.tracking";
import { Gtag, GtagEvent } from "./types.tracking";

const logGAWarning = (message: string) => {
  console.warn(`[Tracking] Warning: ${message}`);
};

const getGtag = () => {
  if (!IS_GTM_ENABLED) {
    logGAWarning("Google Analytics is not enabled");
    return null;
  }
  if (!window.gtag) {
    logGAWarning(`GTag does not exist`);
    throw new Error("GTag does not exist");
  }
  return window.gtag;
};

const withGtag = (callback: (gtag: Gtag.Gtag) => void) => {
  const gtag = getGtag();
  if (!gtag) return;
  callback(gtag);
};

export const sendGAEvent = (event: GtagEvent) =>
  withGtag((gtag) => {
    gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  });

export const grantConsentForEverything = () =>
  withGtag((gtag) => {
    gtag("consent", "update", {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  });

export const markFeatureUsage = (feature: string) =>
  performance.mark("mark_feature_usage", {
    detail: { feature },
  });

export const pageview = (url: string) =>
  withGtag((gtag) => {
    gtag("config", trackingConfig.gtmId, {
      page_path: url,
    });
  });
