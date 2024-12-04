"use client";

import { Suspense, useEffect, useState } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import { GoogleTagManagerScripts } from "./GoogleTagManagerScripts";
import { trackingConfig } from "@/libs/tracking/config.tracking";
import { grantConsentForEverything } from "@/libs/tracking/utils.tracking";

export const GoogleTagManager = () => {
  const [isGtagLoaded, setIsGtagLoaded] = useState(false);
  const [hasSetConsent, setHasSetConsent] = useState(false);

  // Handle Consent
  useEffect(() => {
    if (isGtagLoaded && !hasSetConsent) {
      // Get historic consent value
      const consent = getCookieConsentValue(
        trackingConfig.cookieBannerCookieName
      );

      if (consent === "true") {
        grantConsentForEverything();
      }

      setHasSetConsent(true);
    }
  }, [isGtagLoaded, hasSetConsent]);

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${trackingConfig.gtmId}`}
          height="0"
          width="0"
          style={{
            display: "none",
            visibility: "hidden",
          }}
        ></iframe>
      </noscript>
      {/* We need to use Suspense in order to access useSearchParams (see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout) */}
      <Suspense>
        <GoogleTagManagerScripts
          gaId={trackingConfig.gtmId}
          onLoadCallback={() => setIsGtagLoaded(true)}
        />
      </Suspense>
    </>
  );
};
