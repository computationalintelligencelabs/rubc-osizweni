import express, { Request, Response } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
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
    const { firstName, lastName, ticketType, price } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !ticketType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Proof of payment file is required' });
    }

    // Prepare email content
    const emailHTML = `
      <h2>New Gala Dinner Ticket Registration</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Ticket Type:</strong> ${ticketType}</p>
      <p><strong>Price:</strong> R${price}</p>
      <p><strong>Proof of Payment:</strong> See attached file</p>
      <hr>
      <p><em>This ticket registration was submitted on ${new Date().toLocaleString()}</em></p>
    `;

    // Send email with attachment
    const mailOptions = {
      from: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
      to: 'rubcosizweni.office@gmail.com',
      subject: 'New Gala Dinner Ticket Registration',
      html: emailHTML,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    // Clean up uploaded file after sending
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({ 
      success: true, 
      message: 'Ticket registration submitted successfully. Proof of payment attached to email.' 
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    
    // Clean up file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({ 
      error: 'Failed to process ticket registration. Please try again.' 
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
