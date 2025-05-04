

function createStorageService({ isAllowed, cookie = { path: '/', maxAgeSeconds: 60 * 60 * 24 * 7 } }) {
    // Cookie helpers
    function setCookie(key, value) {
      const encoded = encodeURIComponent(value);
      const maxAge = `; max-age=${cookie.maxAgeSeconds}`;
      const path = `; path=${cookie.path}`;
      document.cookie = `${key}=${encoded}${maxAge}${path}`;
    }
  
    function getCookie(key) {
      const nameEQ = key + '=';
      const cookies = document.cookie.split(';');
      for (let c of cookies) {
        const trimmed = c.trim();
        if (trimmed.startsWith(nameEQ)) {
          return decodeURIComponent(trimmed.substring(nameEQ.length));
        }
      }
      return null;
    }
  
    function removeCookie(key) {
      document.cookie = `${key}=; Max-Age=0; path=${cookie.path}`;
    }
  
    // Unified API
    function get(key, type = 'local') {
      if (!isAllowed()) return null;
      try {
        if (type === 'local') return localStorage.getItem(key);
        if (type === 'session') return sessionStorage.getItem(key);
        if (type === 'cookie') return getCookie(key);
      } catch (e) {
        return null;
      }
    }
  
    function set(key, value, type = 'local') {
      if (!isAllowed()) return;
      try {
        if (type === 'local') localStorage.setItem(key, value);
        else if (type === 'session') sessionStorage.setItem(key, value);
        else if (type === 'cookie') setCookie(key, value);
      } catch (e) {
        // fail silently
      }
    }
  
    function remove(key, type = 'local') {
      if (!isAllowed()) return;
      try {
        if (type === 'local') localStorage.removeItem(key);
        else if (type === 'session') sessionStorage.removeItem(key);
        else if (type === 'cookie') removeCookie(key);
      } catch (e) {
        // fail silently
      }
    }
  
    return { get, set, remove };
  }
  

const hasConsent = () => localStorage.getItem('cookieConsent') === 'true';

// ✅ Exported storage instance
export const storage = createStorageService({
  isAllowed: hasConsent,
  cookie: { path: '/', maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30 days
});