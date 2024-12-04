"use client";

import { IS_GTM_ENABLED, trackingConfig } from "./config.tracking";
import { GtagEvent } from "./types.tracking";

const logGAWarning = (message: string) => {
  console.warn(message);
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

export const sendGAEvent = (event: GtagEvent) => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
};

export const grantConsentForEverything = () => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  });
};

export const markFeatureUsage = (feature: string) => {
  performance.mark("mark_feature_usage", {
    detail: { feature },
  });
};

export const pageview = (url: string) => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("config", trackingConfig.gtmId, {
    page_path: url,
  });
};
