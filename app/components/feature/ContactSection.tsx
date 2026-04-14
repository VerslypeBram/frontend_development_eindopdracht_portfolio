import { Mail } from 'lucide-react';
import { Icon } from '@iconify/react';
import Button from '@/app/components/common/Button';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-background">
      <div className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-500 uppercase mb-3">Contact</h3>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">Get In Touch</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">I&apos;m always open to new opportunities and interesting projects. Feel free to reach out!</p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <Button href="mailto:bram.verslype@student.howest.be">
            Say Hello <Mail size={18} className="transition-transform duration-200 group-hover:scale-110" />
          </Button>

          <div className="flex items-center gap-4">
            <a href="https://github.com/VerslypeBram" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 transition-all duration-300">
              <Icon icon="simple-icons:github" width={18} height={18} />
            </a>
            <a href="https://linkedin.com/in/bram-verslype" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 transition-all duration-300">
              <Icon icon="simple-icons:linkedin" width={18} height={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
