import dotenv from 'dotenv';
import handler from '../netlify/functions/submit-registration.ts';

dotenv.config({ path: '.env.local' });

async function run() {
  console.log('Testing submit-registration endpoint with contact submission...');

  const contactForm = new FormData();
  contactForm.append('formName', 'contact');
  contactForm.append('firstName', 'Test');
  contactForm.append('lastName', 'User');
  contactForm.append('email', 'test@example.com');
  contactForm.append('message', 'This is a verification test for the contact form.');

  const contactRequest = new Request('http://localhost/api/submit-registration', {
    method: 'POST',
    body: contactForm,
  });

  const contactResponse = await handler(contactRequest, {} as any);
  console.log('Contact response status:', contactResponse.status);
  console.log('Contact response body:', await contactResponse.text());

  console.log('\nTesting submit-registration endpoint with ticket submission and proof file...');

  const ticketForm = new FormData();
  ticketForm.append('formName', 'gala_ticket');
  ticketForm.append('Full_Name', 'Test Ticket User');
  ticketForm.append('email', 'testticket@example.com');
  ticketForm.append('Ticket_Type', 'VIP');

  const fileBytes = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 55]);
  const proofFile = new File([fileBytes], 'proof.pdf', { type: 'application/pdf' });
  ticketForm.append('proofOfPayment', proofFile);

  const ticketRequest = new Request('http://localhost/api/submit-registration', {
    method: 'POST',
    body: ticketForm,
  });

  const ticketResponse = await handler(ticketRequest, {} as any);
  console.log('Ticket response status:', ticketResponse.status);
  console.log('Ticket response body:', await ticketResponse.text());
}

run().catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});
