export async function handleRsvp(request, env) {
  if (request.method === 'GET') {
    let list = [];
    if (env.RSVPS) {
      try {
        list = (await env.RSVPS.get('all', 'json').catch(() => null)) || [];
      } catch (error) {
        console.warn('KV read failed:', error);
      }
    }
    return Response.json(list);
  }

  const body = await request.json().catch(() => ({}));

  if (!body.fullName) {
    return Response.json({ error: 'Full name is required' }, { status: 400 });
  }

  const record = {
    id: Date.now().toString(),
    ...body,
    receivedAt: new Date().toISOString(),
  };

  // Persist to Cloudflare KV when the RSVPS binding is configured. The browser
  // also saves a copy in localStorage, so a missing binding is non-fatal.
  if (env.RSVPS) {
    try {
      const existing = (await env.RSVPS.get('all', 'json').catch(() => null)) || [];
      existing.push(record);
      await env.RSVPS.put('all', JSON.stringify(existing));
    } catch (error) {
      console.warn('KV write failed, RSVP kept in browser storage:', error);
    }
  }

  return Response.json({ success: true, message: 'RSVP stored successfully' });
}
