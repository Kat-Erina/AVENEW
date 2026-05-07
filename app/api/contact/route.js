import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, tel, bedrooms, language, contact } = await request.json();

    await resend.emails.send({
      from: 'AVENEW <noreply@avenew.ge>',
      to: ['marketing@avenew.ge', 'tornikesamkharadzee@gmail.com'],
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

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
