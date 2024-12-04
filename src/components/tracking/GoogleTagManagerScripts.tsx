"use client";

import { markFeatureUsage, pageview } from "@/libs/tracking/utils.tracking";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { FC, useEffect } from "react";

type Props = {
  gaId: string;
  onLoadCallback?: () => void;
};

export const GoogleTagManagerScripts: FC<Props> = ({
  gaId,
  onLoadCallback,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageview on route change
  useEffect(() => {
    const url = pathname + searchParams.toString();

    pageview(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    markFeatureUsage("google_analytics_tag");
  }, []);

  return (
    <>
      {/* Inline script to set up dataLayer and define window.gtag */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            window.gtag = function(){ window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
            });
            window.gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* Load the GTM script via src to enable onLoad callback */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={onLoadCallback}
      />
    </>
  );
};
