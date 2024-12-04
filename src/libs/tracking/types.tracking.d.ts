declare global {
  interface Window {
    gtag?: Gtag.Gtag;
  }
}

declare namespace Gtag {
  interface Gtag {
    (...args: GtagFunctionArgs): void;
  }

  type GtagFunctionArgs =
    | [GtagCommand, EventName | EventParams | CustomParams]
    | [GtagCommand, string, EventParams | CustomParams];

  type GtagCommand = "config" | "set" | "js" | "event" | "consent";

  interface EventParams {
    [key: string]: unknown;
  }

  interface CustomParams {
    [key: string]: unknown;
  }

  type EventName =
    | "click"
    | "submit"
    | "purchase"
    | "page_view"
    | "screen_view";
  // Add other standard event names as needed
}

export type SendGAEventDto = {
  action: Gtag.EventName;
  category: string;
  label: string;
};

export type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};
