import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-lg">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-bold rounded">
                  RU
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Rise-Up</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Raising the Lord's Army for the End-Time Harvest. Connecting and equipping believers for the effective work of ministry.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100066479535576" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                <span>Ob63 St, Osizweni A,<br/>Newcastle, 2952</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <span>076-255-0626</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span>admin@rubcosizweni.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to receive updates on our latest events and sermons.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                placeholder="Your email address" 
                required 
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" 
                type="email" 
              />
              <button 
                type="submit" 
                className="w-full px-6 py-3 rounded-[28px] bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© 2026 Rise-Up Bible Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
