"use client"


import { useEffect } from "react"
import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import PackagesSection from "../components/PackageSection"
import DubaiCityTourSection from "../components/DubaiCityTourSection"
import DiscoverSection from "../components/DiscoverSection"
import { newPackageData } from "@/data/packages"
import ReCaptcha from "@/components/ReCaptcha"


export default function HomePage() {


  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17520497621/P4I4CMCJ-scbENWntqJB',
        value: 1.0,
        currency: 'AED'
      })
    }
  }, [])


  return (
    <>
      <Hero />


      {newPackageData.map((section, index) => (
        <PackagesSection
          key={index}
          id={section.id}
          title={section.title}
          cards={section.cards}
        />
      ))}


      <DubaiCityTourSection />
      <DiscoverSection />
      <Testimonials />
      <ReCaptcha />
    </>
  )
}