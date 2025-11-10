export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "/orbi-city-logo-real.webp";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

// Contact Information
export const CONTACT_INFO = {
  phone: "+995 555 19 90 90",
  email: "info@orbicitybatumi.com",
  address: "Orbi City, Block C, Khimshiashvili St, Batumi",
  whatsapp: "+995555199090"
};

// Hero Section
export const HERO_TITLE = "Your Perfect Seaside Escape";
export const HERO_SUBTITLE = "Experience luxury at Orbi City Batumi aparthotel with stunning Black Sea views, private balconies, and premium amenities";
