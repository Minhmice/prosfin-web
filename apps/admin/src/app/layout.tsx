import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { MSWProvider } from "@/components/providers/msw-provider";

export const metadata: Metadata = {
  title: "ProsFIN Admin",
  description: "ProsFIN Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MSWProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </MSWProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function fixNextjsPortal() {
                  const portals = document.querySelectorAll('nextjs-portal');
                  portals.forEach((portal) => {
                    if (portal instanceof HTMLElement) {
                      portal.style.setProperty('position', 'fixed', 'important');
                      portal.style.setProperty('top', '0', 'important');
                      portal.style.setProperty('left', '0', 'important');
                      portal.style.setProperty('width', '100vw', 'important');
                      portal.style.setProperty('height', '100vh', 'important');
                      portal.style.setProperty('pointer-events', 'none', 'important');
                      portal.style.setProperty('z-index', '9999', 'important');
                      portal.style.setProperty('margin', '0', 'important');
                      portal.style.setProperty('padding', '0', 'important');
                    }
                  });
                }
                fixNextjsPortal();
                const observer = new MutationObserver(fixNextjsPortal);
                observer.observe(document.body, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

