import { handleWish } from './api/wish.js';
import { handleRsvp } from './api/rsvp.js';
import { handleEmail } from './api/email.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/api/health') {
      return Response.json({
        ok: true,
        resend: Boolean(env.RESEND_API_KEY),
        nvidia: Boolean(env.NVIDIA_API_KEY || env.NVAPI_KEY),
        resendFrom: Boolean(env.RESEND_FROM),
        assets: Boolean(env.ASSETS),
      });
    }
    if (pathname === '/api/ai/wish' && request.method === 'POST') {
      return handleWish(request, env);
    }
    if (pathname === '/api/rsvp' && (request.method === 'POST' || request.method === 'GET')) {
      return handleRsvp(request, env);
    }
    if (pathname === '/api/rsvp/email' && request.method === 'POST') {
      return handleEmail(request, env);
    }
    if (pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
