import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { setSeoMetadata } from '../lib/seo';

export default function GalaDinnerPoster() {
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSeoMetadata({
      title: 'Gala Dinner Poster | Rise-Up Bible Church',
      description: 'Download and share the Rise-Up Bible Church Gala Dinner 2026 poster with event details and church branding.',
      url: window.location.pathname,
      image: '/logo.jpg',
    });
  }, []);

  const downloadPoster = async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'rubc-gala-dinner-2026.png';
        link.click();
      } catch (error) {
        console.error('Error downloading poster:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">
            Gala Dinner Poster
          </h1>
          <p className="text-muted-foreground">Download and share this beautiful poster</p>
        </div>

        {/* Poster Preview */}
        <div className="flex justify-center mb-8">
          <div
            ref={posterRef}
            className="relative w-full max-w-2xl aspect-[9/12] bg-gradient-to-br from-primary via-primary/80 to-secondary/90 rounded-2xl overflow-hidden shadow-2xl 2xl max-h-screen object-cover"
            style={{
              backgroundImage: 'url(/images/gala-dinner-poster.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-between p-8 md:p-12 text-white text-center">
              {/* Header with Logo */}
              <div className="pt-4">
                <img
                  src="/logo.jpg"
                  alt="Rise-Up Bible Church"
                  className="w-20 h-20 rounded-lg shadow-lg mx-auto mb-6 border-4 border-white/20"
                />
                <h2 className="text-2xl md:text-4xl font-display font-bold mb-2">Rise-Up Bible Church</h2>
                <div className="h-1 w-24 bg-white/50 mx-auto"></div>
              </div>

              {/* Main Title */}
              <div className="flex-1 flex items-center justify-center">
                <div>
                  <p className="text-lg md:text-2xl font-light mb-4 tracking-widest">CORDIALLY INVITES YOU TO</p>
                  <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight">
                    GALA<br />DINNER<br />2026
                  </h1>
                  <div className="flex gap-4 justify-center mb-6">
                    <div className="h-1 w-12 bg-white/70 rounded-full"></div>
                    <div className="h-1 w-12 bg-white/70 rounded-full"></div>
                    <div className="h-1 w-12 bg-white/70 rounded-full"></div>
                  </div>
                  <p className="text-sm md:text-lg font-light italic mb-2">An Evening of Celebration & Fellowship</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="w-full space-y-6 pb-6">
                {/* Date */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm font-light mb-1">📅 DATE</p>
                  <p className="text-2xl md:text-3xl font-bold">25 JUNE 2026</p>
                </div>

                {/* Time & Venue */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <p className="text-xs font-light mb-1">🕕 TIME</p>
                    <p className="text-lg md:text-xl font-bold">18:00 PM</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <p className="text-xs font-light mb-1">📍 VENUE</p>
                    <p className="text-xs md:text-sm font-semibold">Kwanobuhle Hall</p>
                  </div>
                </div>

                {/* Venue Details */}
                <p className="text-xs md:text-sm font-light">
                  Next to Idonsa High, Osizweni
                </p>

                {/* CTA */}
                <div className="pt-4 border-t border-white/30">
                  <p className="text-sm md:text-base font-semibold mb-2">GET YOUR TICKETS</p>
                  <p className="text-xs md:text-sm font-light">VVIP • VIP • GENERAL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button
            onClick={downloadPoster}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
          >
            <Download size={20} />
            Download Poster
          </button>
        </div>
      </div>
    </div>
  );
}
