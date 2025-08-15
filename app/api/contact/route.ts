import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Store contact submission in Supabase using admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          subject: subject,
          message: message,
          submitted_at: new Date().toISOString(),
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Error storing contact submission:', error)
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      )
    }

    // For demo purposes, we'll also try to send an email notification
    // This will work if EMAIL_USER and EMAIL_PASS are configured
    try {
      const nodemailer = require('nodemailer')
      
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        })

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'dominicnaatey@gmail.com',
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
                <h3 style="color: #007bff; margin-top: 0;">Message</h3>
                <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
                <p>This email was sent from the IBAG Ghana website contact form.</p>
                <p>Submitted on: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `
        }

        await transporter.sendMail(mailOptions)
        console.log('Email notification sent successfully')
      }
    } catch (emailError) {
      console.log('Email notification failed (this is optional):', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: data[0]?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}