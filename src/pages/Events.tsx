import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "09:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "Join us for a powerful time of worship, prayer, and an inspiring message from the Word of God.",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2946&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Midweek Bible Study",
      date: "Every Wednesday",
      time: "18:00 PM - 19:30 PM",
      location: "Fellowship Hall",
      description: "Dive deeper into the Scriptures with our interactive Bible study sessions. Perfect for spiritual growth.",
      image: "https://pixabay.com/get/ge82176f9f29822a137fc2e355f5fc64b78ee8a67e341d11a08265e0cb75c6dc8a5c0dcdf6c0987b92555a743ff459118bdca307186f69d293f3819c28033e71d_1280.jpg"
    },
    {
      id: 3,
      title: "Youth Gathering",
      date: "Every Friday",
      time: "17:30 PM - 19:00 PM",
      location: "Youth Center",
      description: "A dynamic space for young people to connect, worship, and learn about God's purpose for their lives.",
      image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-white min-h-screen pb-24">
        <section className="pt-20 pb-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-secondary mb-6">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us as we gather to worship, learn, and grow together in community.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent z-10 transition-colors duration-300"></div>
                    <img alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={event.image} />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold font-display text-secondary mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar size={18} className="text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock size={18} className="text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin size={18} className="text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">{event.description}</p>
                    
                    <div className="mt-auto pt-6 border-t border-border">
                      <button className="w-full py-3 rounded-xl bg-secondary text-white font-medium hover:bg-primary transition-colors duration-300">
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
