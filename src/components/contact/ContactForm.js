export default function ContactForm() {
    return (
        <section className="container py-5">
            <div className="row pb-3">
                {/* Contact Information */}
                <div className="col-lg-5 mb-5 mb-lg-0">
                    <h4 className="fw-bold mb-4">Contact Information</h4>

                    <div className="mb-4 d-flex">
                        <i className="bi bi-geo-alt-fill text-success fs-3 me-3"></i>
                        <div>
                            <h6 className="mb-1 fw-bold">Head Office</h6>
                            <p className="mb-0">Desert Safari AE LLC<br />Dubai, United Arab Emirates</p>
                        </div>
                    </div>

                    <div className="mb-4 d-flex">
                        <i className="bi bi-envelope-fill text-success fs-3 me-3"></i>
                        <div>
                            <h6 className="mb-1 fw-bold">Email</h6>
                            <p className="mb-0">info@safaridesert.ae<br />support@safaridesert.ae</p>
                        </div>
                    </div>

                    <div className="mb-4 d-flex">
                        <i className="bi bi-telephone-fill text-success fs-3 me-3"></i>
                        <div>
                            <h6 className="mb-1 fw-bold">Phone</h6>
                            <p className="mb-0">+971 50 123 4567<br />+971 52 765 4321</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-lg-7 shadow pb-3">
                    <h3 className="fw-bold mb-4">Send Us a Message</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" style={{backgroundColor: "#eee"}} id="name" placeholder="Your Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" style={{backgroundColor: "#eee"}} id="email" placeholder="Your Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input type="text" className="form-control" style={{backgroundColor: "#eee"}} id="subject" placeholder="Subject" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" style={{backgroundColor: "#eee"}} id="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>

                        <button type="submit" className="btn btn-warning px-5">Send Message</button>
                    </form>
                </div>
            </div>
        </section>


    )
}