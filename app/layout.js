// app/layout.js

import './globals.css';

export const metadata = {
  title: 'ADHD Support Assistant',
  description: 'A chatbot to help with ADHD support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
