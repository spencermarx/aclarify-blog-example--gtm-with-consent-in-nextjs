"use client";

import { trackingConfig } from "@/libs/tracking/config.tracking";
import { grantConsentForEverything } from "@/libs/tracking/utils.tracking";
import { ReactNode } from "react";
import CookieConsent from "react-cookie-consent";
import { motion } from "framer-motion";

export const RootInnerLayout = ({ children }: { children: ReactNode }) => (
  <>
    <main className="w-full h-full relative">{children}</main>
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <CookieConsent
        disableStyles={true}
        cookieName={trackingConfig.cookieBannerCookieName}
        buttonText="Acknowledge"
        onAccept={grantConsentForEverything}
        location="bottom"
        containerClasses="w-full px-6 py-4 bg-black text-white text-center flex justify-center items-center flex-wrap shadow gap-3 md:gap-8 rounded-t-4xl shadow"
        buttonClasses="px-8 py-1.5 *:text-lg inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition bg-white text-black hover:bg-white/90 transition-colors ease-in-out duration-100"
      >
        <p>This website uses cookies to enhance the user experience.</p>
      </CookieConsent>
    </motion.div>
  </>
);
