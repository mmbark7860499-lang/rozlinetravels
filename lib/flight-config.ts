// PORTAL URL: change this value if TBO provides a new approved API/embed URL.
// The current webpage redirects without an agent session and sends
// X-Frame-Options: SAMEORIGIN, so it cannot be embedded on this website.
export const SUPPLIER_PORTAL_URL =
  "https://m.travelboutiqueonline.com/FlightSearch.aspx";

// FLIGHT MARKUP: add this ₹500 charge only when the official portal/API supports
// markup settings or returns fares to this server-side backend. An external link
// or iframe price cannot and must not be changed by the website frontend.
// When API pricing is available, return only the final payable fare to customers.
export const FLIGHT_MARKUP_INR = 500;
