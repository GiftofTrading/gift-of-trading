/**
 * Analytics tracking utility
 * Uses Manus built-in analytics via environment variables
 */

const ANALYTICS_ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const ANALYTICS_WEBSITE_ID = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

interface PageViewEvent {
  type: 'pageview';
  url: string;
  title?: string;
  referrer?: string;
}

interface CustomEvent {
  type: 'event';
  name: string;
  properties?: Record<string, any>;
}

type AnalyticsEvent = PageViewEvent | CustomEvent;

/**
 * Send analytics event to the tracking endpoint
 */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  if (!ANALYTICS_ENDPOINT || !ANALYTICS_WEBSITE_ID) {
    console.warn('Analytics not configured - missing endpoint or website ID');
    return;
  }

  try {
    const payload = {
      website_id: ANALYTICS_WEBSITE_ID,
      ...event,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      language: navigator.language,
    };

    // Use beacon API for reliability (especially for page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
    } else {
      // Fallback to fetch
      await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch (error) {
    console.error('Failed to send analytics event:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(title?: string): void {
  trackEvent({
    type: 'pageview',
    url: window.location.pathname,
    title: title || document.title,
    referrer: document.referrer,
  });
}

/**
 * Track custom event
 */
export function trackCustomEvent(name: string, properties?: Record<string, any>): void {
  trackEvent({
    type: 'event',
    name,
    properties,
  });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, buttonText?: string): void {
  trackCustomEvent('button_click', {
    button_name: buttonName,
    button_text: buttonText,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackCustomEvent('form_submission', {
    form_name: formName,
    success,
  });
}

/**
 * Track enrollment/signup
 */
export function trackEnrollment(courseName: string, courseId?: string): void {
  trackCustomEvent('enrollment', {
    course_name: courseName,
    course_id: courseId,
  });
}

/**
 * Track link click
 */
export function trackLinkClick(linkUrl: string, linkText?: string): void {
  trackCustomEvent('link_click', {
    link_url: linkUrl,
    link_text: linkText,
  });
}
