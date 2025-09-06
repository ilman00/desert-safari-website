// app/layout.js
import TopNavbar from '@/components/Topnavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapClient from "../components/BootstrapClient";
import SecondNavbar from '@/components/SecondNavbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BookingProvider } from "@/components/BookingContext";
import BookingModal from "@/components/BookingModal";
import { Playfair_Display, Lato } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });



export const metadata = {
  title: 'Desert Safari Dubai | Morning & Evening Desert Tours',
  description: 'Experience the thrill of morning and evening desert safaris in Dubai. Enjoy dune bashing, camel rides, sandboarding, BBQ dinner, and cultural shows. Book now!',
  keywords: [
    'desert safari dubai',
    'morning desert safari dubai',
    'evening desert safari dubai',
    'dune bashing dubai',
    'camel ride dubai',
    'BBQ dinner safari',
    'private desert safari',
    'safari tours dubai',
    'dubai desert tours',
    'sandboarding dubai',
  ],
  authors: [{ name: 'Evening Desert Tours', url: 'https://eveningdeserttours.com' }],
  openGraph: {
    title: 'Desert Safari Dubai | Morning & Evening Safari Packages',
    description: 'Book the best desert safari in Dubai — choose from morning or evening tours. Includes dune bashing, camel rides, sandboarding, BBQ, and more!',
    url: 'https://eveningdeserttours.com',
    siteName: 'Evening Desert Tours',
    images: [
      {
        url: 'https://eveningdeserttours.com/images/Evening_Desert_Safari_Dubai.webp', // Replace with real image
        width: 1200,
        height: 630,
        alt: 'Dubai Desert Safari - Morning & Evening',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Desert Safari | Morning & Evening Tours',
    description: 'Explore Dubai desert with morning and evening safari options. Thrilling dune rides, camel treks, and cultural shows await. Reserve your adventure!',
    images: ['https://eveningdeserttours.com/images/Evening_Desert_Safari_Dubai.webp'], // Replace with real image
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  metadataBase: new URL('https://eveningdeserttours.com'),
};




export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.className} ${playfair.className}`}>

      <head>
        <link rel="icon" href="/safari-icon.png" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>

      <body>
        <BootstrapClient />
        <div >
          <BookingProvider>
            <TopNavbar />
            <SecondNavbar />
            {children}
            <Footer />
            <BookingModal />
            <WhatsAppFloatingButton />
          </BookingProvider>
        </div>

      </body>
    </html>
  );
}
