import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

/* ** IMPORTANT: Adjust the src paths to match your Gilroy font file names and extensions (.ttf or .woff2)
** This loads the Gilroy fonts and assigns CSS variables for use in Tailwind config.
*/
const gilroyRegular = localFont({
  src: '../public/fonts/Gilroy-Regular.ttf', // ADJUST PATH/EXTENSION
  variable: '--font-gilroy-regular',
  weight: '400',
  display: 'swap',
});

const gilroyBold = localFont({
  src: '../public/fonts/Gilroy-Bold.ttf', // ADJUST PATH/EXTENSION
  variable: '--font-gilroy-bold',
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rydberg Starck HRMS", // Updated Title
  description: "Infinite Possibilities - Human Resource Management System", // Updated Description
  // Add Favicons
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variables to the html tag
    <html lang="en" className={`${gilroyRegular.variable} ${gilroyBold.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}