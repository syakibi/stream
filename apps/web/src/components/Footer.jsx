import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Youtube, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/syakib_arslan', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@syakibi_yt', label: 'Youtube' },
    { icon: MessageCircle, href: 'https://discord.com/invite/dYBWRcCbzm', label: 'Discord' }
  ];

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://postimg.cc/B8MH6Kp3" //profile
                  alt="Syakibi Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: 'Outfit' }}>Syakibi</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Creating art and streaming games. Join me on this journey. Follow me on social media for updates, behind-the-scenes content, and more!
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-semibold text-sm tracking-wide uppercase">Quick links</span>
            <div className="flex flex-wrap gap-4">
              <Link to="/" className="text-sm hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link to="/streamer" className="text-sm hover:text-primary transition-colors duration-200">
                Stream
              </Link>
              <Link to="/art" className="text-sm hover:text-primary transition-colors duration-200">
                Works
              </Link>
              <Link to="/social" className="text-sm hover:text-primary transition-colors duration-200">
                Social feed
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm">
            <span>© {currentYear} Syakibi</span>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://ko-fi.com/syakibi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 text-sm font-medium"
            >
              <Heart className="w-4 h-4" />
              Support on Ko-fi
            </a>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg hover:bg-background/50 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;