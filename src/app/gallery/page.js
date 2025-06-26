import GallaryHero from "@/components/gallary/GalleryHero";
import ImageCard from "@/components/gallary/GalleryImgs";

const images = [
    "/images/Gallery/gallery-1.jpg",
    "/images/Gallery/gallery-2.jpg",
    "/images/Gallery/gallery-3.jpg",
    "/images/Gallery/gallery-4.jpg",
    "/images/Gallery/gallery-5.jpg",
    "/images/Gallery/gallery-6.jpg",
    "/images/Gallery/gallery-7.jpg",
    "/images/Gallery/gallery-8.jpg",
    "/images/Gallery/gallery-9.jpg",
    "/images/Gallery/gallery-10.jpg",
    "/images/Gallery/gallery-11.jpg",
    "/images/Gallery/gallery-12.jpg",
];

export default function GallaryPage() {
    return (
        <>
            <GallaryHero title="Our Gallery" 
                heroText="Your Trusted Guide to Spiritual Discoveries"
            />

            <section className="container text-center py-4">
                <p className="text-muted">Incredible Moments</p>
                <h2 className="fw-bold">Journey Of Faith, Crafted by Almahyra&apos;s Expert Hands</h2>
            </section>

            <section className="container-fluid">
                <div className="row justify-content-center">
                    {images.map((image, index) => (
                        <ImageCard key={index} src={image} />
                    ))}
                </div>
            </section>
            {/*src="/images/Gallery/gallery-background-2.jpg"*/}
            <section
                className="position-relative text-white d-flex align-items-center justify-content-center text-center mt-5"
                style={{
                    height: "100vh",
                    backgroundImage: "url('/images/Gallery/gallery-8.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Dark Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

                {/* Content */}
                <div className="position-relative z-1 container px-3">
                    <h2 className="fw-bold mb-3 display-5 display-md-4 display-lg-3">
                        Discover More
                    </h2>
                    <h4 className="mb-3 h5 h4-md h3-lg">
                        Journey with Purpose: Almahyra&apos;s Hajj and Umrah Excellence
                    </h4>
                    <p className="mb-4 fs-6 fs-md-5 fs-lg-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                    <a href="/booking" className="btn btn-warning btn-lg px-4">
                        Book Now
                    </a>
                </div>
            </section>




        </>
    );
}
