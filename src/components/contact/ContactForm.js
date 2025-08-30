'use client';

export default function ContactForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const form = e.target;
        const formData = {
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        };
      
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          const result = await res.json();
      
          if (res.ok) {
            alert("Message sent successfully!");
            form.reset();
          } else {
            alert("Error: " + result.error);
          }
        } catch (err) {
          alert("Something went wrong. Please try again later.");
        }
      };
      



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
                            <p className="mb-0">eesamuneeb@gmail.com<br />sherdesertsafari@gmail.com</p>
                        </div>
                    </div>

                    <div className="mb-4 d-flex">
                        <i className="bi bi-telephone-fill text-success fs-3 me-3"></i>
                        <div>
                            <h6 className="mb-1 fw-bold">Phone</h6>
                            <p className="mb-0">+971 50 424 7436</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-lg-7 shadow pb-3">
                    <h3 className="fw-bold mb-4">Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" style={{ backgroundColor: "#eee" }} id="name" placeholder="Your Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" style={{ backgroundColor: "#eee" }} id="email" placeholder="Your Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input type="text" className="form-control" style={{ backgroundColor: "#eee" }} id="subject" placeholder="Subject" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" style={{ backgroundColor: "#eee" }} id="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>

                        <button type="submit" className="btn btn-warning px-5">Send Message</button>
                    </form>
                </div>
            </div>
        </section>


    )
}