import express, { Request, Response } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const app = express();
const port = Number(process.env.PORT) || 3001;
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseBucket = process.env.SUPABASE_BUCKET || 'ticket-uploads';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// CORS Middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, and PDF are allowed.'));
    }
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle ticket registration form submission
app.post('/api/submit-ticket', upload.single('proofOfPayment'), async (req: Request, res: Response) => {
  try {
    const { Full_Name, Email, Ticket_Type } = req.body;

    if (!Full_Name || !Email || !Ticket_Type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ error: 'Proof of payment file is required' });
    }

    const priceMap: Record<string, number> = {
      General: 250,
      VIP: 500,
      VVIP: 750,
    };
    const price = priceMap[Ticket_Type] ?? 250;
    const storagePath = `ticket-proofs/${Date.now()}-${req.file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from(supabaseBucket)
      .upload(storagePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(supabaseBucket)
      .createSignedUrl(storagePath, 60 * 60 * 24);

    if (signedUrlError || !signedUrlData) {
      throw signedUrlError || new Error('Failed to create signed URL for proof of payment.');
    }

    const ticketRecord = {
      full_name: Full_Name,
      email: Email,
      ticket_type: Ticket_Type,
      price,
      proof_of_payment_url: signedUrlData.signedUrl,
      submitted_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from('tickets').insert(ticketRecord);
    if (insertError) {
      throw insertError;
    }

    const emailHTML = `
      <h2>New Gala Dinner Ticket Registration</h2>
      <p><strong>Name:</strong> ${Full_Name}</p>
      <p><strong>Email:</strong> ${Email}</p>
      <p><strong>Ticket Type:</strong> ${Ticket_Type}</p>
      <p><strong>Price:</strong> R${price}</p>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p><em>Proof of payment file attached below</em></p>
    `;

    // Download the file from Supabase to attach to email
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(supabaseBucket)
      .download(storagePath);

    if (downloadError) {
      console.warn('Warning: Could not download file for email attachment', downloadError);
    }

    const mailOptions: any = {
      from: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
      to: 'sbongambhele203@gmail.com',
      subject: 'New Gala Dinner Ticket Registration',
      html: emailHTML,
    };

    // Attach file if successfully downloaded
    if (fileData) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          content: fileData,
          contentType: req.file.mimetype,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Ticket registration submitted successfully.',
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({
      error: 'Failed to process ticket registration. Please try again.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
