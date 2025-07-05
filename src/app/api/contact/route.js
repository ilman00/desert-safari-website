import nodemailer from "nodemailer"

export async function POST(req) {
    try {

        const body = await req.json()
        const { name, email, subject, message } = body

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: `Contact Form: ${subject || 'No Subject'}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        `,
        })

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
        });
    }
}