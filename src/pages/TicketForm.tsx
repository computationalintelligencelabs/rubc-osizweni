import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const css = `/* Logo Colors */
:root {
  --rise-orange: #FF5C00;
  --rise-black: #000000;
  --rise-white: #ffffff;
  --light-grey: #f4f4f4;
}
.form-container {
  background: var(--rise-white);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
  border-top: 6px solid var(--rise-orange);
}
.logo-header {
  text-align: center;
  margin-bottom: 20px;
}
.logo-header img {
  max-width: 180px;
  height: auto;
}
h2 {
  text-align: center;
  color: var(--rise-black);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 30px;
  font-size: 1.5rem;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--rise-black);
  font-size: 14px;
}
input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  background: var(--rise-white);
  border-radius: 4px;
  color: var(--rise-black);
  box-sizing: border-box;
  transition: border-color 0.3s;
}
input:focus, select:focus {
  outline: none;
  border-color: var(--rise-orange);
}
input[type="file"] {
  font-size: 13px;
  color: #666;
}
.submit-btn {
  width: 100%;
  padding: 15px;
  background: var(--rise-orange);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}
.submit-btn:hover {
  background: var(--rise-black);
}
.note {
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
  color: #777;
  line-height: 1.4;
}`;

export default function TicketForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('✅ Your ticket registration has been submitted successfully!\n\nPlease check your email for confirmation. The church office will verify your payment within 24-48 hours.');
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`❌ There was an error submitting your reservation:\n\n${error.error || 'Please try again.'}`);
      }
    } catch (error) {
      alert('❌ There was an error submitting your reservation. Please check your internet connection and try again.');
    }
  };

  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-gradient-to-b from-primary/5 to-transparent min-h-screen pb-24">
        <section className="pt-16 pb-12 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button
              onClick={() => navigate('/events')}
              className="mb-6 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <X size={20} />
              Close
            </button>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-secondary mb-4">
              Gala Dinner Ticket Registration
            </h1>
            <p className="text-lg text-muted-foreground">
              Join us for an unforgettable evening on June 25, 2026
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-3xl mx-auto">
              <p className="text-xs text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-900 block mb-2">📋 Instructions:</span>
                1. Enter your full name and select your preferred ticket type. <br />
                2. Make an EFT payment to Capitec Bank (Account: 2499420282, Branch: 470010). <br />
                3. Upload your proof of payment (bank receipt or screenshot). <br />
                4. Click "Complete Registration" to submit your ticket booking.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 md:p-12">
                  <div className="flex justify-center mb-10">
                    <img
                      src="/logo.jpg"
                      alt="Rise-Up Bible Church Logo"
                      className="w-16 h-16 rounded-lg shadow-sm border border-border/50"
                    />
                  </div>
                  <style dangerouslySetInnerHTML={{ __html: css }} />
                  <form id="ticketForm" action="/api/submit-ticket" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name and Surname</label>
                      <input type="text" id="name" name="Full_Name" placeholder="Enter your full name" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="Email" placeholder="name@example.com" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="ticket">Type of Ticket</label>
                      <select id="ticket" name="Ticket_Type" required>
                        <option value="" disabled>Select ticket category</option>
                        <option value="General">General</option>
                        <option value="VIP">VIP</option>
                        <option value="VVIP">VVIP</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="payment">Proof of Payment (Upload Image or PDF)</label>
                      <input type="file" id="payment" name="proofOfPayment" accept="image/*,.pdf" required />
                    </div>

                    <button type="submit" className="submit-btn">Submit Reservation</button>
                    <p className="note">
                      By submitting, your data will be sent to the church office. <br />
                      Please allow 24-48 hours for payment verification.
                    </p>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sticky top-24">
                  <h3 className="font-display font-bold text-lg text-secondary mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Ticket Type:</span>
                      <span className="font-semibold text-secondary text-right">General</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-bold text-lg text-primary">R250</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary text-sm mb-4">Event Details</h4>
                    <div className="space-y-3 text-xs text-muted-foreground">
                      <p><span className="font-semibold text-secondary">Date:</span> 25 June 2026</p>
                      <p><span className="font-semibold text-secondary">Time:</span> 18:00 PM</p>
                      <p><span className="font-semibold text-secondary">Venue:</span> Kwanobuhle Hall, Next to Idonsa High, Osizweni</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
                  <h4 className="font-display font-bold text-secondary mb-4">Payment Instructions</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Step 1:</p>
                      <p className="text-muted-foreground">Pay via EFT to the account details below</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 space-y-2 border border-primary/20">
                      <div>
                        <p className="text-xs text-muted-foreground">Account Number</p>
                        <p className="font-mono font-bold text-secondary">2499420282</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bank</p>
                        <p className="font-semibold text-secondary">Capitec</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Branch Code</p>
                        <p className="font-mono font-bold text-secondary">470010</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Step 2:</p>
                      <p className="text-muted-foreground">Upload proof of payment (bank receipt or screenshot)</p>
                    </div>
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
