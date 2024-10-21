import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "./component/SessionWrapper";
import * as React from 'react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';

timeago.register('vi', vi);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Twitter-app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </SessionWrapper>
    </html>
  );
}
