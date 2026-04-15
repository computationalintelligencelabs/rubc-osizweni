import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const css = `/* Logo Colors */
:root {
  --rise-orange: #FF5C00;
  --rise-black: #000000;
  --rise-white: #ffffff;
  --light-grey: #f4f4f4;
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
                1. Enter your full name and select your preferred ticket type. 
                2. Make an EFT payment to Capitec Bank (Account: 2499420282, Branch: 470010). 
                3. Upload your proof of payment (bank receipt or screenshot). 
                4. Click "Complete Registration" to submit your ticket booking.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 md:p-12">
                  {/* Church Logo */}
                  <div className="flex justify-center mb-10">
                    <img
                      src="/logo.jpg"
                      alt="Rise-Up Bible Church Logo"
                      className="w-16 h-16 rounded-lg shadow-sm border border-border/50"
                    />
                  </div>
                  <style dangerouslySetInnerHTML={{__html: css}} />
                  <form action="https://formsubmit.co/rubcosizweni.office@gmail.com" method="POST" encType="multipart/form-data">
                    <input type="text" name="_honey" style={{display: 'none'}} />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_subject" value="New Gala Dinner Reservation" />
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
                        <option value="" disabled selected>Select ticket category</option>
                        <option value="General">General</option>
                        <option value="VIP">VIP</option>
                        <option value="VVIP">VVIP</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment">Proof of Payment (Upload Image)</label>
                      <input type="file" id="payment" name="Proof_of_Payment" accept="image/*" required />
                    </div>
                    <button type="submit" className="submit-btn">Submit Reservation</button>
                    <p className="note">
                      By submitting, your data will be sent to the church office. 
                      Please allow 24-48 hours for payment verification.
                    </p>
                  </form>
                </div>
              </div>

              {/* Payment Instructions & Summary */}
              <div className="lg:col-span-1 space-y-6">
                {/* Order Summary */}
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

                {/* Payment Instructions */}
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
}import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  ticketType: string;
  proofOfPayment: File | null;
}

export default function TicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    ticketType: 'general',
    proofOfPayment: null,
  });

  const [fileName, setFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ticketTypes = [
    { id: 'vvip', label: 'VVIP - R400', price: 400 },
    { id: 'vip', label: 'VIP - R300', price: 300 },
    { id: 'general', label: 'General - R250', price: 250 },
  ];

const css = `/* Logo Colors */
:root {
  --rise-orange: #FF5C00;
  --rise-black: #000000;
  --rise-white: #ffffff;
  --light-grey: #f4f4f4;
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

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          proofOfPayment: 'Please upload an image (JPG, PNG, GIF) or PDF file'
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          proofOfPayment: 'File size must be less than 5MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        proofOfPayment: file
      }));
      setFileName(file.name);
      setErrors(prev => ({
        ...prev,
        proofOfPayment: ''
      }));
    }
  };

  const currentTicket = ticketTypes.find(t => t.id === formData.ticketType);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.proofOfPayment) {
      newErrors.proofOfPayment = 'Proof of payment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors(prev => ({ ...prev, submit: '' }));
      
      // Submit to backend server
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('ticketType', formData.ticketType);
        formDataToSend.append('price', currentTicket?.price.toString() || '0');
        if (formData.proofOfPayment) {
          formDataToSend.append('proofOfPayment', formData.proofOfPayment);
        }
        
        // Send to backend server. Use a relative /api path when VITE_API_URL is not configured.
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const submitUrl = apiUrl ? `${apiUrl}/api/submit-ticket` : '/api/submit-ticket';
        const response = await fetch(submitUrl, {
          method: 'POST',
          body: formDataToSend
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to submit ticket');
        }
        
        setSubmitted(true);
        setTimeout(() => {
          navigate('/events');
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(prev => ({ 
          ...prev, 
          submit: error instanceof Error ? error.message : 'Failed to submit ticket. Please try again.' 
        }));
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <main className="flex-grow pt-20">
        <div className="w-full bg-white min-h-screen flex items-center justify-center pb-24">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="mb-6">
              <CheckCircle size={64} className="text-primary mx-auto" />
            </div>
            <h1 className="text-3xl font-bold font-display text-secondary mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your ticket has been successfully registered for the Gala Dinner.
            </p>
            <p className="text-lg font-medium text-secondary mb-8">
              Redirecting you back to events...
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Ticket Type: <span className="font-semibold text-secondary">{currentTicket?.label}</span></p>
              <p>Name: <span className="font-semibold text-secondary">{formData.firstName} {formData.lastName}</span></p>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
                1. Enter your full name and select your preferred ticket type. 
                2. Make an EFT payment to Capitec Bank (Account: 2499420282, Branch: 470010). 
                3. Upload your proof of payment (bank receipt or screenshot). 
                4. Click "Complete Registration" to submit your ticket booking.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 md:p-12">
                  {/* Church Logo */}
                  <div className="flex justify-center mb-10">
                    <img
                      src="/logo.jpg"
                      alt="Rise-Up Bible Church Logo"
                      className="w-16 h-16 rounded-lg shadow-sm border border-border/50"
                    />
                  <style dangerouslySetInnerHTML={{__html: css}} />

                  <form action="https://formsubmit.co/rubcosizweni.office@gmail.com" method="POST" encType="multipart/form-data">

                    <input type="text" name="_honey" style={{display: 'none'}} />

                    <input type="hidden" name="_captcha" value="false" />

                    <input type="hidden" name="_subject" value="New Gala Dinner Reservation" />

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

                        <option value="" disabled selected>Select ticket category</option>

                        <option value="General">General</option>

                        <option value="VIP">VIP</option>

                        <option value="VVIP">VVIP</option>

                      </select>

                    </div>

                    <div className="form-group">

                      <label htmlFor="payment">Proof of Payment (Upload Image)</label>

                      <input type="file" id="payment" name="Proof_of_Payment" accept="image/*" required />

                    </div>

                    <button type="submit" className="submit-btn">Submit Reservation</button>

                    <p className="note">

                      By submitting, your data will be sent to the church office. 

                      Please allow 24-48 hours for payment verification.

                    </p>

                  </form>

                </div>

              </div>

              {/* Payment Instructions & Summary */}
              <div className="lg:col-span-1 space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sticky top-24">
                  <h3 className="font-display font-bold text-lg text-secondary mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Ticket Type:</span>
                      <span className="font-semibold text-secondary text-right">{currentTicket?.label}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-bold text-lg text-primary">R{currentTicket?.price}</span>
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

                {/* Payment Instructions */}
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
