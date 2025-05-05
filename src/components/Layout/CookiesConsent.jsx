'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'cookies_consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set(COOKIE_NAME, 'accepted', { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3 shadow-lg d-flex flex-column flex-md-row justify-content-between align-items-center z-index-fixed" style={{ zIndex: 1050 }}>
      <div className="mb-2 mb-md-0 me-md-3">
        We use cookies to improve your experience. Strictly necessary cookies are always active. By clicking "Accept", you agree to our use of non-essential cookies.
        <a href="/privacy-policy" className="text-info ms-1">Learn more</a>.
      </div>
      <button className="btn btn-primary" onClick={acceptCookies}>
        Accept
      </button>
    </div>
  );
}
