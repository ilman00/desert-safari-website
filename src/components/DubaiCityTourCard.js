export default function DubaiCityTourCard({ title, image, price, description, buttonText, buttonLink }) {
    return (
        <div className="card h-100 shadow-sm p-5" style={{minHeight: "100vh"}}>
            {/* Heading */}
            <div className="card-header bg-white border-bottom-0">
                <h4 className="text-center mb-0">{title}</h4>
            </div>

            {/* Image */}
            <img
                src={image}
                alt={title}
                className="card-img-top"
                style={{ objectFit: "cover", maxHeight: "220px" }}
            />

            {/* Body */}
            <div className="card-body d-flex flex-column">
                {/* Price */}
                <h5 className="text-success fw-bold text-center mb-3">{price}</h5>

                {/* Paragraph */}
                <p className="card-text text-muted text-center" style={{ fontSize: "0.95rem" }}>
                    {description}
                </p>

                {/* Button */}
                <div className="mt-auto text-center">
                    <a
                        href={buttonLink}
                        className="btn btn-warning px-4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
}
