import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

/* ** IMPORTANT: This assumes you have the Gilroy font files locally. 
** Adjust the src paths to match your file structure.
*/
const gilroyRegular = localFont({
  src: '../public/fonts/Gilroy-Regular.ttf', // Adjust path as necessary
  variable: '--font-gilroy-regular',
  weight: '400',
  display: 'swap',
});

const gilroyBold = localFont({
  src: '../public/fonts/Gilroy-Bold.ttf', // Adjust path as necessary
  variable: '--font-gilroy-bold',
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rydberg Starck Application",
  description: "Infinite Possibilities",
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