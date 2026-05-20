import { Resend } from 'resend';
import { createHash } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const PIXEL_ID = '3973613329435324';

function sha256(value) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export async function POST(request) {
  try {
    
    const { name, tel, bedrooms, language, contact, eventId } = await request.json();

    const { error } = await resend.emails.send({
      from: 'AVENEW <noreply@avenew.ge>',
      to: ['nalchevanidzekaterina@gmail.com'],
      subject: `ახალი განაცხადი — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
          <h2 style="color: #331516; margin-bottom: 24px;">ახალი განაცხადი</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999; width: 140px;">სახელი</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #171717; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">ტელეფონი</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #171717; font-weight: 500;">${tel}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">საძინებლები</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #171717; font-weight: 500;">${bedrooms ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">ენა</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #171717; font-weight: 500;">${language}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #999;">კომუნიკაცია</td>
              <td style="padding: 12px 0; color: #171717; font-weight: 500;">${contact}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) return Response.json({ error: error.message }, { status: 500 });

    const capiToken = process.env.FACEBOOK_CAPI_TOKEN;
    if (capiToken) {
      const clientIp =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        '';
      const userAgent = request.headers.get('user-agent') || '';
      await fetch(
        `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${capiToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{
              event_name: 'Lead',
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: 'website',
              user_data: {
                ph: [sha256(tel)],
                client_ip_address: clientIp,
                client_user_agent: userAgent,
              },
            }],
          }),
        }
      ).catch(() => {});
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
