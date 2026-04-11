import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-white min-h-screen pb-24">
        <section className="pt-12 pb-8 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div>
              <Link to="/blog" className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-secondary mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                {post.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs">
                    {post.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <span className="text-secondary">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-16">
          <div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img alt={post.title} className="w-full h-[400px] md:h-[600px] object-cover" src={post.image} />
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div>
            <div 
              className="prose prose-lg md:prose-xl prose-headings:font-display prose-headings:text-secondary prose-p:text-muted-foreground prose-a:text-primary max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              <h4 className="font-display font-bold text-xl text-secondary">Share this message</h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
