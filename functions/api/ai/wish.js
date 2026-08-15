const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

const STYLE_GUIDE = {
  heartfelt:
    'Write a warm, heartfelt and emotional blessing. Keep it 2-3 short sentences, from the heart, mentioning the couple by name.',
  funny:
    'Write a lighthearted, charming and genuinely funny congratulatory message. Keep it 2-3 sentences with a warm finish, mentioning the couple by name.',
  poetic:
    'Write a poetic, elegant and romantic blessing in beautiful flowing language. Keep it 2-3 short sentences, mentioning the couple by name.',
  royal:
    'Write an elegant, royal and majestic blessing fitting a grand celebration. Keep it 2-3 sentences, mentioning the couple by name.',
};

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

export async function onRequestPost(context) {
  const body = await context.request.json().catch(() => ({}));
  const { guestName, style, event, customPrompt } = body || {};

  const env = context.env || {};
  const NVIDIA_API_KEY = env.NVIDIA_API_KEY || env.NVAPI_KEY || '';

  const coupleNames = 'Praveena (the bride) & Muralidharan (the groom)';
  const guest = (guestName || 'a dear guest').trim();
  const eventName = event || 'the wedding ceremony';
  const tone = style || 'heartfelt';

  if (!NVIDIA_API_KEY) {
    return Response.json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
  }

  const systemPrompt =
    'You are a warm, witty Indian wedding blessing writer. The couple is ' +
    coupleNames +
    '. The groom is a doctor and the bride is a pharmacist. Respond ONLY with the finished wish text — no greetings like "Here is...", no explanations, no markdown, no quotation marks around the whole text.';

  const baseRequest = `Write a ${tone} wedding wish for ${guest} for ${eventName} on behalf of the couple ${coupleNames}. ${STYLE_GUIDE[tone] || STYLE_GUIDE.heartfelt}`;
  const userPrompt = customPrompt
    ? `Write a wedding wish for ${guest} for ${eventName} for the couple ${coupleNames}. Requirement: ${customPrompt}. ${STYLE_GUIDE[tone] || STYLE_GUIDE.heartfelt}`
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
      return Response.json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
    }

    const data = await response.json();
    const wish = data?.choices?.[0]?.message?.content?.trim();
    return Response.json({ wish: wish || fallbackWish(guest, eventName, tone, customPrompt) });
  } catch (error) {
    return Response.json({ wish: fallbackWish(guest, eventName, tone, customPrompt) });
  }
}
