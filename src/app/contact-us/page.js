import GallaryHero from "@/components/gallary/GalleryHero"
import ContactForm from "@/components/contact/ContactForm"
import Map from "@/components/contact/Map"
export default function ContactUs() {
    return (
        <>
            <GallaryHero title="Contact Us"
                heroText="Start the conversation to established good relationship and business."
            />
            <ContactForm />
            <Map />
        </>
    )
}