import React, { useState } from 'react';
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ticketTypes = [
    { id: 'vvip', label: 'VVIP - R400', price: 400 },
    { id: 'vip', label: 'VIP - R300', price: 300 },
    { id: 'general', label: 'General - R250', price: 250 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        
        // Send to backend server
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/submit-ticket`, {
          method: 'POST',
          body: formDataToSend
        });

        if (!response.ok) {
          throw new Error('Failed to submit ticket');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'Failed to submit ticket. Please try again.' });
        return;
      }
      
      setSubmitted(true);
      setTimeout(() => {
        navigate('/events');
      }, 3000);
    }
  };

  const currentTicket = ticketTypes.find(t => t.id === formData.ticketType);

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

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                          First Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                            errors.firstName
                              ? 'border-red-500 bg-red-50'
                              : 'border-border/50 focus:border-primary focus:outline-none'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle size={16} /> {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                          Last Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                            errors.lastName
                              ? 'border-red-500 bg-red-50'
                              : 'border-border/50 focus:border-primary focus:outline-none'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle size={16} /> {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Ticket Type */}
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">
                        Ticket Type <span className="text-primary">*</span>
                      </label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-border/50 focus:border-primary focus:outline-none font-medium text-secondary bg-white cursor-pointer transition-colors"
                      >
                        {ticketTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {currentTicket?.label}
                      </p>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">
                        Proof of Payment <span className="text-primary">*</span>
                      </label>
                      <div className={`relative border-3 border-dashed rounded-lg p-8 text-center transition-colors ${
                        errors.proofOfPayment
                          ? 'border-red-500 bg-red-50'
                          : 'border-primary/30 hover:border-primary/60 bg-primary/5'
                      }`}>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-3">
                          <Upload size={32} className={`${errors.proofOfPayment ? 'text-red-500' : 'text-primary'}`} />
                          <div>
                            <p className="font-semibold text-secondary">
                              {fileName ? fileName : 'Click to upload or drag and drop'}
                            </p>
                            {!fileName && (
                              <p className="text-sm text-muted-foreground mt-1">
                                JPG, PNG, GIF or PDF (Max 5MB)
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.proofOfPayment && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={16} /> {errors.proofOfPayment}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors duration-300 shadow-sm hover:shadow-md"
                    >
                      Complete Registration
                    </button>
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
