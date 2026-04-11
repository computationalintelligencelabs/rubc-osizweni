import { Link } from 'react-router-dom';
import { User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';

export default function Blog() {
  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-white min-h-screen pb-24">
        <section className="pt-20 pb-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-secondary mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, teachings, and updates from the pastoral team at Rise-Up Bible Church.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
      </div>
    </main>
  );
}
