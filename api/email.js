const WEDDING_DETAILS = {
  coupleNames: 'Praveena & Muralidharan',
  displayDate: 'Sunday, 23rd August 2026',
  displayTime: '9:00 AM – 10:30 AM',
  venue: 'A1 Mahal, Near Vaani Bus Stop',
  address: 'Ramanathapuram, Tamil Nadu',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=A1+Mahal+Near+Vaani+Bus+Stop+Ramanathapuram+Tamil+Nadu',
};

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

async function sendViaResend(env, rsvp) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'Wedding Invitation <onboarding@resend.dev>',
      to: [rsvp.email],
      subject: `Wedding Invitation — ${WEDDING_DETAILS.coupleNames} · ${WEDDING_DETAILS.displayDate}`,
      html: buildConfirmationHtml(rsvp),
    }),
  });
  return { ok: res.ok, text: await res.text() };
}

async function sendViaSendGrid(env, rsvp) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: rsvp.email }] }],
      from: { email: env.SENDGRID_FROM || env.EMAIL_USER || 'wedding@example.com', name: 'Wedding Invitation' },
      subject: `Wedding Invitation — ${WEDDING_DETAILS.coupleNames} · ${WEDDING_DETAILS.displayDate}`,
      content: [{ type: 'text/html', value: buildConfirmationHtml(rsvp) }],
    }),
  });
  return { ok: res.ok, text: await res.text() };
}

export async function handleEmail(request, env) {
  const rsvp = await request.json().catch(() => ({}));

  if (!rsvp.email || !String(rsvp.email).includes('@')) {
    return Response.json({ error: 'A valid email address is required' }, { status: 400 });
  }

  if (!env.RESEND_API_KEY && !env.SENDGRID_API_KEY) {
    return Response.json(
      {
        error: 'Email service is not configured on the server.',
        notice: 'RSVP was still recorded.',
      },
      { status: 503 },
    );
  }

  try {
    const result = env.RESEND_API_KEY
      ? await sendViaResend(env, rsvp)
      : await sendViaSendGrid(env, rsvp);

    if (!result.ok) {
      console.warn('Email provider rejected request:', result.text.slice(0, 300));
      return Response.json({ error: 'Email provider rejected the request' }, { status: 502 });
    }

    return Response.json({ success: true, message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return Response.json({ error: 'Failed to send confirmation email' }, { status: 500 });
  }
}
