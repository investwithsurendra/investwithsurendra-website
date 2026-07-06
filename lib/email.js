import { Resend } from "resend";

let client = null;
function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function sendLeadEmail(lead) {
  const c = getClient();
  if (!c) return { skipped: true };
  const to = process.env.NOTIFICATION_EMAIL || "surendra.kumar.ctl@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const html = `
    <div style="font-family:Poppins,Arial,sans-serif;max-width:600px;margin:auto;background:#fff;">
      <div style="background:#071C34;color:#fff;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#C89B3C;font-family:Georgia,serif;">New Lead \u2022 Invest With Surendra</h1>
      </div>
      <div style="padding:24px;color:#071C34;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:600;">Name</td><td style="padding:8px;">${escapeHtml(lead.name)}</td></tr>
          <tr><td style="padding:8px;font-weight:600;background:#f5f5f7;">Mobile</td><td style="padding:8px;background:#f5f5f7;"><a href="tel:${escapeHtml(lead.mobile)}">${escapeHtml(lead.mobile)}</a></td></tr>
          <tr><td style="padding:8px;font-weight:600;">Project</td><td style="padding:8px;">${escapeHtml(lead.project || "-")}</td></tr>
          <tr><td style="padding:8px;font-weight:600;background:#f5f5f7;">Budget</td><td style="padding:8px;background:#f5f5f7;">${escapeHtml(lead.budget || "-")}</td></tr>
          <tr><td style="padding:8px;font-weight:600;">Visit Date</td><td style="padding:8px;">${escapeHtml(lead.visitDate || "-")}</td></tr>
          <tr><td style="padding:8px;font-weight:600;background:#f5f5f7;">Message</td><td style="padding:8px;background:#f5f5f7;">${escapeHtml(lead.message || "-")}</td></tr>
          <tr><td style="padding:8px;font-weight:600;">Source</td><td style="padding:8px;">${escapeHtml(lead.source || "-")}</td></tr>
        </table>
        <div style="margin-top:24px;text-align:center;">
          <a href="https://wa.me/91${escapeHtml((lead.mobile||'').replace(/\D/g,''))}" style="background:#C89B3C;color:#071C34;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">Reply on WhatsApp</a>
        </div>
      </div>
    </div>`;
  try {
    const r = await c.emails.send({ from, to, subject: `New Lead: ${lead.name} (${lead.mobile})`, html });
    return { sent: true, id: r?.data?.id };
  } catch (e) {
    console.error("Email send failed:", e.message);
    return { error: e.message };
  }
}

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
