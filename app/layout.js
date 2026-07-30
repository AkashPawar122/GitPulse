import "./globals.css";

export const metadata = {
  title: "GitPulse",
  description: "GitHub year-in-review card for developers",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full"
        suppressHydrationWarning
      >{children}</body>
    </html>
  );
}
