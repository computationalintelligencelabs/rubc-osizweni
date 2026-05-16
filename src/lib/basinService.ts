/**
 * Basin Forms API Service
 * Handles form submissions with file attachments to Basin Forms API
 * 
 * Basin is a free, unlimited form submission service
 * API Docs: https://usebasin.com
 */

const BASIN_ENDPOINT = import.meta.env.VITE_BASIN_ENDPOINT;
const BASIN_TICKET_ID = import.meta.env.VITE_BASIN_TICKET_ID;
const BASIN_CONTACT_ID = import.meta.env.VITE_BASIN_CONTACT_ID;

// Validate environment variables are set
if (!BASIN_ENDPOINT) {
  console.warn("Basin endpoint not configured. Forms may not work properly.");
}

export interface TicketFormData {
  Full_Name: string;
  email: string;
  Ticket_Type: string;
  proofOfPayment: File;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

/**
 * Submit ticket form to Basin Forms API
 * Includes proof of payment file attachment
 */
export async function submitTicketForm(data: TicketFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate required fields
    if (!data.Full_Name || !data.email || !data.Ticket_Type) {
      throw new Error("Missing required fields: Full Name, Email, or Ticket Type");
    }

    if (!data.proofOfPayment) {
      throw new Error("Proof of payment file is required");
    }

    // Validate file type (accept images and PDFs)
    const validFileTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (!validFileTypes.includes(data.proofOfPayment.type)) {
      throw new Error("Only JPG, PNG, GIF, and PDF files are accepted");
    }

    // Validate file size (max 25MB for Basin)
    const maxFileSize = 25 * 1024 * 1024; // 25MB
    if (data.proofOfPayment.size > maxFileSize) {
      throw new Error(`File size exceeds 25MB limit. Your file is ${(data.proofOfPayment.size / 1024 / 1024).toFixed(2)}MB`);
    }

    // Create FormData for multipart submission to our serverless endpoint
    const formData = new FormData();
    formData.append("formName", "gala_ticket");
    formData.append("Full_Name", data.Full_Name);
    formData.append("email", data.email);
    formData.append("Ticket_Type", data.Ticket_Type);
    formData.append("proofOfPayment", data.proofOfPayment, data.proofOfPayment.name);

    // Submit to our serverless function
    const response = await fetch(`/api/submit-registration`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Submission error: ${response.status} ${response.statusText} ${text}`);
    }

    const json = await response.json();

    return {
      success: true,
      message: "Ticket registration submitted successfully! We'll confirm your booking via email.",
      id: json.id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Ticket form submission error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Submit contact form to Basin Forms API
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      throw new Error("Missing required fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email address");
    }

    // Create FormData for our serverless endpoint
    const formData = new FormData();
    formData.append("formName", "contact");
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const response = await fetch(`/api/submit-registration`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Submission error: ${response.status} ${response.statusText} ${text}`);
    }
+
+    const json = await response.json();
+
+    return {
+      success: true,
+      message: "Your message has been sent successfully. We'll get back to you soon!",
+      id: json.id,
+    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Contact form submission error:", errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Validate file before submission
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const validFileTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  const maxFileSize = 25 * 1024 * 1024; // 25MB

  if (!validFileTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Only JPG, PNG, GIF, and PDF files are accepted",
    };
  }

  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds 25MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  return { valid: true };
}
