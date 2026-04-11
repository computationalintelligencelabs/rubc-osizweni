import { Link } from 'react-router-dom';
import { User, Clock, ArrowRight, Phone, Send } from 'lucide-react';
import { blogPosts } from '../data';

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main className="flex-grow pt-20">
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Church Worship" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2946&auto=format&fit=crop" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left pt-20">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary font-medium text-sm tracking-wider uppercase mb-6 backdrop-blur-sm">
                Welcome to Rise-Up Bible Church
              </span>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 leading-tight max-w-4xl">
                RAISING THE LORD'S <span className="text-primary">ARMY</span> FOR THE END-TIME HARVEST
              </h1>
            </div>
            <div>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Connecting and equipping believers for effective ministry through preaching, teaching, and small group discipleship.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/about" className="px-8 py-4 rounded-[28px] bg-primary text-white font-bold text-lg hover:bg-white hover:text-primary shadow-[0_0_20px_rgba(238,73,2,0.3)] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                  Learn More
                </Link>
                <Link to="/events" className="px-8 py-4 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                  View Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[40px] transform -rotate-3"></div>
                  <img 
                    alt="Bible Study Community" 
                    className="relative rounded-3xl shadow-xl z-10 w-full h-[500px] object-cover" 
                    src="https://pixabay.com/get/ge82176f9f29822a137fc2e355f5fc64b78ee8a67e341d11a08265e0cb75c6dc8a5c0dcdf6c0987b92555a743ff459118bdca307186f69d293f3819c28033e71d_1280.jpg" 
                  />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Mission</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">Equipping Believers for the Work of Ministry</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Connecting and equipping believers for the effective work of ministry through preaching, teaching, and small group discipleship so that together we reach the unsaved with good news.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">✓</div>
                    <span className="font-medium text-secondary">Preaching the Word</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">✓</div>
                    <span className="font-medium text-secondary">Interactive Teaching</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">✓</div>
                    <span className="font-medium text-secondary">Small Group Discipleship</span>
                  </div>
                </div>
                <Link to="/about" className="inline-flex px-8 py-4 rounded-[28px] bg-secondary text-white font-bold hover:bg-primary transition-colors duration-300">
                  Read Our Full Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Messages Section */}
        <section className="py-24 bg-background border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Latest Messages</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary">From the Pastor's Desk</h3>
              </div>
              <div>
                <Link to="/blog" className="inline-flex px-6 py-3 rounded-[28px] border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-colors duration-300">
                  View All Posts
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <div key={post.id}>
                  <Link to={`/blog/${post.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent z-10 transition-colors duration-300"></div>
                      <img alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.image} />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-primary" />
                          {post.author}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary" />
                          {post.date} • {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">{post.subtitle}</p>
                      <div className="mt-auto pt-6 flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={18} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Get in Touch</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">We'd Love to Hear From You</h3>
                <p className="text-muted-foreground text-lg">Whether you have a question, a prayer request, or just want to connect, our team is ready to help.</p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-2 bg-secondary text-white p-10 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-2xl font-bold mb-6">Contact Information</h4>
                      <p className="text-gray-400 mb-10">Fill out the form and our team will get back to you within 24 hours.</p>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Phone size={20} className="text-primary mt-1" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-400">076-255-0626</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Send size={20} className="text-primary mt-1" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-400">admin@rubcosizweni.org</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <p className="font-medium mb-4">Location</p>
                      <p className="text-gray-400 leading-relaxed">Ob63 St, Osizweni A,<br/>Newcastle, 2952</p>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-10">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-secondary">First Name</label>
                          <input required className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="John" type="text" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-secondary">Last Name</label>
                          <input required className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Doe" type="text" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Email Address</label>
                        <input required className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="john@example.com" type="email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Your Message</label>
                        <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none" placeholder="How can we help you?"></textarea>
                      </div>
                      <button type="submit" className="w-full py-4 rounded-[28px] bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-4">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
