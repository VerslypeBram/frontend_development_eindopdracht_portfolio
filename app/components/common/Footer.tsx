import Link from 'next/link';
import CurrentYear from './CurrentYear';

export default function Footer() {
  const footerLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Expertise', href: '#skills' },
    { name: 'My Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com/VerslypeBram' },
  ];

  return (
    <footer className="w-full py-12 bg-background dark:bg-background-dark transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-bold font-heading text-neutral-900 dark:text-white tracking-tight">
              Bram Verslype
            </Link>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-xs text-sm leading-relaxed">Design-minded developer focused on building beautiful, interactive digital experiences.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Connect</h4>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm underline-offset-4 decoration-amber-500 hover:underline hover:decoration-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex justify-center items-center text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © <CurrentYear /> Bram Verslype. Built with Next.js and Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
