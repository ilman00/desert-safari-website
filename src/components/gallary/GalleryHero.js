import Image from "next/image"
export default function GallaryHero({title, heroText}){
    return (
        <>
        <section className="position-relative">
        {/* Background Video */}
        <Image src="/images/gallary-background-img.jpg" width={800} height={600}
          className="w-100 position-absolute top-0 start-0 h-100 object-fit-cover"
          style={{ zIndex: -2 }}
        />
  
        {/* Fullscreen Blur Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "	rgba(0, 90, 90, 0.5)", // your color with transparency
            border: "1px solid rgba(27, 125, 117, 0.3)",
            zIndex: -1,
          }}
        ></div>
  
  
        {/* Overlay Content */}
        <div
          className="container text-light text-center d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '100vh', zIndex: 1 }}
        >
          <h1 className="display-4 fw-bold">{title}</h1>
          <p className="lead" style={{fontWeight: "400", fontSize:"2rem"}}>{heroText}</p>
          
        </div>
      </section>
        </>
    )
}