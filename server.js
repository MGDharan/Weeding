import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

// NVIDIA NIM API — set via env var or fall back to bundled key (development only)
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || process.env.NVAPI_KEY || '';
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Gmail SMTP — set via env vars
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

// Apply middleware before any routes so req.body is parsed
app.use(cors());
app.use(express.json());

const WEDDING_DETAILS = {
  coupleNames: 'Praveena & Muralidharan',
  displayDate: 'Sunday, 23rd August 2026',
  displayTime: '9:00 AM – 10:30 AM',
  venue: 'A1 Mahal, Near Vaani Bus Stop',
  address: 'Ramanathapuram, Tamil Nadu',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=A1+Mahal+Near+Vaani+Bus+Stop+Ramanathapuram+Tamil+Nadu',
};

function getMailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

function buildConfirmationHtml(rsvp) {
  const attending = rsvp.attending === 'yes';
  return `
    <div style="font-family:Georgia,serif;background:#340911;padding:32px 16px;color:#FFFDF9;">
      <div style="max-width:600px;margin:0 auto;background:#4A121A;border:1px solid rgba(212,175,55,0.5);border-radius:16px;overflow:hidden;">
        <div style="background:#6B1D2F;padding:28px 24px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.4);">
          <p style="margin:0 0 8px;letter-spacing:4px;color:#E5C158;font-size:12px;text-transform:uppercase;">Wedding Invitation</p>
          <h1 style="margin:0;color:#FAF0CA;font-size:32px;font-weight:600;">Praveena &amp; Muralidharan</h1>
          <p style="margin:8px 0 0;color:#E5C158;font-style:italic;">A Royal Union in the Land of the Sethus</p>
        </div>
        <div style="padding:28px 24px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Dearest <strong>${rsvp.fullName || 'Guest'}</strong>,
          </p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">
            ${attending
              ? 'We are overjoyed to have you celebrate with us! Here are the details of our wedding ceremony:'
              : 'Thank you for letting us know. We will miss you, but we are glad you received our invitation. Here are the details of our wedding ceremony:'}
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr>
              <td style="padding:10px 12px;color:#E5C158;font-weight:bold;width:34%;border-bottom:1px solid rgba(212,175,55,0.25);">When</td>
              <td style="padding:10px 12px;border-bottom:1px solid rgba(212,175,55,0.25);">${WEDDING_DETAILS.displayDate}<br/>${WEDDING_DETAILS.displayTime}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#E5C158;font-weight:bold;width:34%;border-bottom:1px solid rgba(212,175,55,0.25);">Where</td>
              <td style="padding:10px 12px;border-bottom:1px solid rgba(212,175,55,0.25);">${WEDDING_DETAILS.venue}<br/>${WEDDING_DETAILS.address}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#E5C158;font-weight:bold;width:34%;border-bottom:1px solid rgba(212,175,55,0.25);">Guests</td>
              <td style="padding:10px 12px;border-bottom:1px solid rgba(212,175,55,0.25);">${rsvp.guestsCount} guest(s) · ${rsvp.dietaryPreference || 'No preference'}</td>
            </tr>
          </table>

          <p style="margin:24px 0 8px;font-size:15px;">Open the live location to find us easily:</p>
          <a href="${WEDDING_DETAILS.mapsUrl}" style="display:inline-block;background:#D4AF37;color:#340911;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:bold;letter-spacing:1px;">📍 View Live Location</a>

          ${rsvp.message ? `<p style="margin:24px 0 0;font-size:14px;font-style:italic;color:#E8DFD8;">Your message to us: "${rsvp.message}"</p>` : ''}

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#E8DFD8;">
            We look forward to sharing this beautiful day with you.<br/>
            With love and blessings,<br/>
            <strong style="color:#E5C158;">Praveena &amp; Muralidharan</strong>
          </p>
        </div>
      </div>
    </div>
  `;
}

// POST endpoint to email the guest their wedding confirmation details
app.post('/api/rsvp/email', async (req, res) => {
  const rsvp = req.body || {};

  if (!rsvp.email || !String(rsvp.email).includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('Email service not configured (EMAIL_USER / EMAIL_PASS missing).');
    return res.status(503).json({
      error: 'Email service is not configured on the server.',
      notice: 'RSVP was still recorded.',
    });
  }

  try {
    const mailer = getMailer();
    await mailer.sendMail({
      from: `"Praveena & Muralidharan" <${EMAIL_USER}>`,
      to: rsvp.email,
      subject: `Wedding Invitation — ${WEDDING_DETAILS.coupleNames} · ${WEDDING_DETAILS.displayDate}`,
      html: buildConfirmationHtml(rsvp),
    });
    console.log(`Confirmation email sent to ${rsvp.email} for ${rsvp.fullName}`);
    return res.status(200).json({ success: true, message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return res.status(500).json({ error: 'Failed to send confirmation email' });
  }
});

// Ensure data folder & file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RSVP_FILE)) {
  fs.writeFileSync(RSVP_FILE, JSON.stringify([], null, 2));
}

// POST endpoint to handle RSVP submissions
app.post('/api/rsvp', (req, res) => {
  try {
    const newRsvp = req.body;
    if (!newRsvp.fullName) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    const fileData = fs.readFileSync(RSVP_FILE, 'utf-8');
    const rsvps = JSON.parse(fileData || '[]');
    
    rsvps.push({
      id: Date.now().toString(),
      ...newRsvp,
      receivedAt: new Date().toISOString(),
    });

    fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2));
    console.log(`Saved new RSVP submission from ${newRsvp.fullName}`);

    return res.status(200).json({ success: true, message: 'RSVP stored successfully' });
  } catch (error) {
    console.error('Error handling RSVP submission:', error);
    return res.status(500).json({ error: 'Failed to record RSVP' });
  }
});

// GET endpoint to view RSVPs
app.get('/api/rsvp', (req, res) => {
  try {
    const fileData = fs.readFileSync(RSVP_FILE, 'utf-8');
    const rsvps = JSON.parse(fileData || '[]');
    return res.status(200).json(rsvps);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read RSVPs' });
  }
});

// POST endpoint for AI-powered wedding wish generation (proxied to NVIDIA NIM)
app.post('/api/ai/wish', async (req, res) => {
  const { guestName, style, event, customPrompt } = req.body || {};

  if (!NVIDIA_API_KEY) {
    return res.status(503).json({
      error: 'AI service is not configured. Please set NVIDIA_API_KEY on the server.',
    });
  }

  const coupleNames = "Praveena (the bride) & Muralidharan (the groom)";
  const guest = (guestName || 'a dear guest').trim();
  const eventName = event || 'the wedding ceremony';
  const tone = style || 'heartfelt';

  const styleGuide = {
    heartfelt:
      'Write a warm, heartfelt and emotional blessing. Keep it 2-3 short sentences, from the heart, mentioning the couple by name.',
    funny:
      'Write a lighthearted, charming and genuinely funny congratulatory message. Keep it 2-3 sentences with a warm finish, mentioning the couple by name.',
    poetic:
      'Write a poetic, elegant and romantic blessing in beautiful flowing language. Keep it 2-3 short sentences, mentioning the couple by name.',
    royal:
      'Write an elegant, royal and majestic blessing fitting a grand celebration. Keep it 2-3 sentences, mentioning the couple by name.',
  };

  const systemPrompt =
    'You are a warm, witty Indian wedding blessing writer. The couple is ' +
    coupleNames +
    '. The groom is a doctor and the bride is a pharmacist. Respond ONLY with the finished wish text — no greetings like "Here is...", no explanations, no markdown, no quotation marks around the whole text.';

  const baseRequest = `Write a ${tone} wedding wish for ${guest} for ${eventName} on behalf of the couple ${coupleNames}. ${styleGuide[tone] || styleGuide.heartfelt}`;
  const userPrompt = customPrompt
    ? `Write a wedding wish for ${guest} for ${eventName} for the couple ${coupleNames}. Requirement: ${customPrompt}. ${styleGuide[tone] || styleGuide.heartfelt}`
    : baseRequest;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error('NVIDIA API error:', response.status, errText.slice(0, 300));
      return res.status(200).json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
    }

    const data = await response.json();
    const wish = data?.choices?.[0]?.message?.content?.trim();
    if (!wish) {
      return res.status(200).json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
    }

    return res.status(200).json({ wish });
  } catch (error) {
    clearTimeout();
    console.error('AI wish generation failed, using local fallback:', error);
    return res.status(200).json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
  }
});

// Offline fallback generator so the AI feature always works even without network access
function fallbackWish(guest, eventName, tone, customPrompt) {
  const name = guest === 'a dear guest' ? guest : guest.split(' ')[0];
  const target = `Praveena and Muralidharan`;

  const sets = {
    heartfelt: [
      `Dear ${name}, as ${target} begin their sacred journey together, may their home overflow with love, their hearts with laughter, and their lives with endless blessings. Wishing you both a lifetime of happiness on your wedding day!`,
      `${name} sends warmest wishes to ${target} — may the love you share today grow deeper with every passing year. Congratulations on your beautiful union!`,
    ],
    funny: [
      `Dear ${name}, since the Doctor and the Pharmacist are finally tying the knot, remember: marriage is the only medicine with no side effects — just pure happiness! Congratulations to ${target}!`,
      `${name} has a prescription for you: take two happy hearts daily, mix with laughter, and you'll live happily ever after. Congratulations ${target}!`,
    ],
    poetic: [
      `As two rivers meet and become one, may the lives of ${target} flow together in perfect harmony — bound by love, blessed by the stars, and written in the poetry of forever.`,
      `Dear ${name}, beneath the golden sky, two souls unite as one. May the blessings of the universe shower upon ${target} and light their path forever.`,
    ],
    royal: [
      `In honour of the magnificent union of ${target}, ${name} extends the grandest of blessings — may their kingdom be built on love, crowned with joy, and reign for eternity.`,
      `A royal celebration for a royal couple! ${name} wishes ${target} a reign of love, a court of joy, and a kingdom of endless happiness.`,
    ],
  };

  if (customPrompt && customPrompt.toLowerCase().includes('fun')) {
    return sets.funny[Math.floor(Math.random() * sets.funny.length)];
  }
  const pool = sets[tone] || sets.heartfelt;
  return pool[Math.floor(Math.random() * pool.length)];
}

app.listen(PORT, () => {
  console.log(`RSVP API Server running on http://localhost:${PORT}`);
});
