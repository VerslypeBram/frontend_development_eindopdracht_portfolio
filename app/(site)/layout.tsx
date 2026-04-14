import { Suspense } from 'react';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import { ThemeProvider } from '../components/common/ThemeProvider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NavBar />
      <main className="flex-1">{children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}
