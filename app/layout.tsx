import React from 'react';

// In a real Next.js app, we would import globals.css here and export metadata.
// Since we are in a preview env, the CSS is loaded via index.html, but the structure remains.

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="antialiased min-h-screen flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
}