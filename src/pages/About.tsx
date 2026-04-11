import { BookOpen, Users, Globe, Mic, Heart, Target } from 'lucide-react';

export default function About() {
  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-background min-h-screen">
        <section className="bg-secondary py-20 border-t-4 border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">About Rise-Up Bible Church</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Learn about our vision, mission, and the people behind our ministry.</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img alt="Church worship" className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" src="https://images.unsplash.com/photo-1473187983305-f615310e7daa?q=80&w=2940&auto=format&fit=crop" />
              </div>
              <div className="space-y-10">
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Vision</h2>
                  <p className="text-3xl font-display font-bold text-secondary leading-tight">"Raising the Lord's Army for the End-Time Harvest"</p>
                </div>
                <div className="h-px w-full bg-border"></div>
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">Connecting and equipping believers for the effective work of ministry through preaching, teaching, and small group discipleship so that together we reach the unsaved with good news.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">Our History</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">Rise-Up Bible Church was founded with a clear vision to raise an army for the Lord's end-time harvest. Under the leadership of Dr. Joel Motlafi and his wife Mrs. Ellen Motlafi, our main branch in Benoni has grown into a vibrant community of believers dedicated to spreading the Gospel.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-5">1</div>
                <h4 className="text-xl font-display font-bold text-secondary mb-3">Main Branch (Benoni, Gauteng)</h4>
                <p className="text-muted-foreground leading-relaxed">Our founding branch in Benoni, Gauteng, led by Dr. Joel Motlafi and Mrs. Ellen Motlafi. This thriving congregation is the heartbeat of Rise-Up Bible Church's mission to reach the nation.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-5">2</div>
                <h4 className="text-xl font-display font-bold text-secondary mb-3">Newcastle Branch (Osizweni)</h4>
                <p className="text-muted-foreground leading-relaxed">Our Newcastle branch, led by Pastor Thulani Nkosi and Mrs. Noluthando Nkosi, extends our ministry's reach into the KwaZulu-Natal region. This branch carries forward our vision while serving the unique needs of the local community.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Leadership</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary">Meet Our Leaders</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Image Placeholder</div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-display font-bold text-secondary mb-1">Dr. Joel Motlafi</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">General Overseer (Benoni Branch)</p>
                  <p className="text-muted-foreground leading-relaxed">Dr. Joel Motlafi, alongside his wife Mrs. Ellen Motlafi, founded Rise-Up Bible Church with a vision to raise an army for the Lord's end-time harvest.</p>
                </div>
              </div>
              <div className="bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Image Placeholder</div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-display font-bold text-secondary mb-1">Pastor Thulani Nkosi</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">Branch Pastor (Osizweni, Newcastle)</p>
                  <p className="text-muted-foreground leading-relaxed">Pastor Thulani Nkosi, together with his wife Mrs. Noluthando Nkosi, leads our Newcastle branch with dedication and passion for community transformation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">How We Serve</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Our Ministry Approach</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">At Rise-Up Bible Church, we believe in a holistic approach to ministry that encompasses every aspect of the believer's life.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <BookOpen size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Biblical Teaching & Preaching</h4>
                <p className="text-muted-foreground">Strong, uncompromised declaration and exposition of God's Word.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Users size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Small Group Discipleship</h4>
                <p className="text-muted-foreground">Intimate communities for deeper spiritual growth and accountability.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Globe size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Community Outreach & Evangelism</h4>
                <p className="text-muted-foreground">Reaching the unsaved with the good news of Christ.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Mic size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Prayer & Intercession</h4>
                <p className="text-muted-foreground">A house of prayer standing in the gap for communities and nations.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Heart size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Youth & Children's Ministry</h4>
                <p className="text-muted-foreground">Empowering the next generation to know and serve God.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Target size={26} />
                </div>
                <h4 className="text-lg font-bold font-display text-secondary mb-3">Equipping Believers</h4>
                <p className="text-muted-foreground">Training and releasing every member for effective ministry.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Foundation</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Our Values</h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">We are a Church that lives by values that are underpinned by love.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {['Unity', 'Respect', 'Excellence', 'Integrity', 'Reading the Bible'].map((value) => (
                <div key={value} className="bg-white/5 border border-white/10 rounded-2xl py-6 px-4 hover:bg-primary/20 hover:border-primary/40 transition-all">
                  <p className="text-white font-display font-bold text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
