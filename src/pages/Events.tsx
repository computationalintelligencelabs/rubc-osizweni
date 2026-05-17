import { useEffect } from 'react';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setSeoMetadata } from '../lib/seo';

export default function Events() {
  const weeklyGatherings = [
    {
      id: 'prayer-tuesday',
      title: "Prayer Meeting",
      day: "Tuesdays",
      time: "16:00 PM",
      icon: "🙏"
    },
    {
      id: 'prayer-sunday',
      title: "Prayer Service",
      day: "Sundays",
      time: "09:30 AM",
      icon: "✨"
    }
  ];

  const regularEvents = [
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

  useEffect(() => {
    setSeoMetadata({
      title: 'Events & Gatherings | Rise-Up Bible Church',
      description: 'Join Rise-Up Bible Church for weekly gatherings, worship services, and special events in Osizweni and Benoni.',
      url: window.location.pathname,
      image: '/logo.jpg',
    });
  }, []);

  const upcomingEvents = [
    {
      id: 'gala-dinner',
      title: "Gala Dinner",
      date: "25 June 2026",
      time: "18:00 PM",
      location: "Kwanobuhle Hall",
      fullLocation: "Kwanobuhle Hall, Next to Idonsa High, Osizweni",
      description: "An unforgettable evening of celebration, fellowship, and fine dining with the Rise-Up Bible Church community. Join us for a night of elegance and togetherness.",
      image: "https://images.unsplash.com/photo-1519671482677-e6837fdc8c7c?q=80&w=2940&auto=format&fit=crop",
      hasTickets: true,
      ticketTypes: [
        { name: "VVIP", price: 400 },
        { name: "VIP", price: 300 },
        { name: "General", price: 250 }
      ]
    },
    {
      id: 'conference',
      title: "10-Year Celebration Conference",
      date: "26-28 June 2026",
      time: "TBA",
      location: "Main Sanctuary",
      description: "Join us for a three-day celebration marking 10 years of God's faithfulness and blessings at Rise-Up Bible Church. Expect powerful messages, prayer sessions, and community fellowship.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
      hasTickets: false
    }
  ];

  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-white min-h-screen pb-24">
        <section className="pt-20 pb-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-secondary mb-6">Events & Gatherings</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us as we gather to worship, learn, and grow together in community.
            </p>
          </div>
        </section>

        {/* Weekly Gatherings Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-transparent border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Weekly Gatherings</h2>
              <p className="text-lg text-muted-foreground">Join us regularly for prayer and spiritual growth</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weeklyGatherings.map((gathering) => (
                <div key={gathering.id} className="bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 p-8">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{gathering.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold font-display text-secondary mb-2">{gathering.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar size={18} className="text-primary" />
                          <span className="font-medium">{gathering.day}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock size={18} className="text-primary" />
                          <span className="font-medium">{gathering.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Special Events */}
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4 flex items-center gap-3">
                <Sparkles size={32} className="text-primary" />
                Special Upcoming Events
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent z-10 transition-colors duration-300"></div>
                    <img alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={event.image} />
                    {event.hasTickets && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Get Tickets
                      </div>
                    )}
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
                    
                    {event.hasTickets && (
                      <div className="mb-6 pb-6 border-b border-border/50">
                        <p className="text-sm font-semibold text-secondary mb-3">Ticket Options:</p>
                        <div className="flex flex-wrap gap-2">
                          {event.ticketTypes?.map((ticket, idx) => (
                            <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                              {ticket.name} - R{ticket.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-auto pt-6 border-t border-border space-y-3">
                      {event.hasTickets && (
                        <Link to="/ticket-form" className="block w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold text-center hover:bg-primary/90 transition-colors duration-300 shadow-sm hover:shadow-md">
                          Get Tickets Now
                        </Link>
                      )}
                      <button className="block w-full py-3 px-4 rounded-xl bg-secondary text-white font-semibold text-center hover:bg-secondary/90 transition-colors duration-300" onClick={() => {
                        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=20260625T180000Z/20260625T220000Z&location=${encodeURIComponent(event.fullLocation)}&details=${encodeURIComponent(event.description)}`;
                        window.open(googleCalendarUrl, '_blank');
                      }}>
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regular Events */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Regular Weekly Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEvents.map((event) => (
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
