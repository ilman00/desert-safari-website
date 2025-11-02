'use client'
import { useEffect } from 'react'
import Script from 'next/script'

export default function ReCaptcha({ onVerify }) {
  useEffect(() => {
    window.onRecaptchaLoad = () => {
      if (!window.grecaptcha) return
      // Prepare to execute manually when needed
      console.log('✅ reCAPTCHA ready')
    }
  }, [])

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onLoad={() => window.onRecaptchaLoad && window.onRecaptchaLoad()}
      />
    </>
  )
}
