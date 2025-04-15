import React from 'react';

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center z-20"> {/* Changed: Added bottom-0, left-0, w-full. Removed mt-auto. Increased z-index */}
    <p>Made with love ❤️ for Automotive Camps</p>
    </footer>
  );
}

export default Footer;