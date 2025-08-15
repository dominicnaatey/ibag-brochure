import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { render } from '@react-email/render'
import { ContactEmail } from '@/components/email-template'

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
      
      // Enhanced debugging for production
      console.log('Email configuration check:')
      console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER)
      console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)
      console.log('EMAIL_USER value:', process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 5) + '***' : 'undefined')
      
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          // Add additional configuration for better reliability
          secure: true,
          port: 465,
          debug: true, // Enable debug mode
          logger: true // Enable logging
        })

        // Verify transporter configuration
        console.log('Verifying email transporter...')
        await transporter.verify()
        console.log('Email transporter verified successfully')

        // Render the React email template to HTML
        const emailHtml = await render(ContactEmail({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
          submittedAt: new Date().toLocaleString()
        }))

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'dominicnaatey@gmail.com',
          subject: `New Contact Form Submission: ${subject}`,
          html: emailHtml
        }

        console.log('Attempting to send email...')
        const result = await transporter.sendMail(mailOptions)
        console.log('Email notification sent successfully:', result.messageId)
      } else {
        console.log('Email credentials not configured - skipping email notification')
      }
    } catch (emailError: any) {
      console.error('Email notification failed (detailed error):', {
        message: emailError?.message,
        code: emailError?.code,
        command: emailError?.command,
        response: emailError?.response,
        responseCode: emailError?.responseCode
      })
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