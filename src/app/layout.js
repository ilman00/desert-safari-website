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
  title: 'Desert Safari Dubai | Best Safari Experience',
  description: 'Enjoy the best desert safari in Dubai with thrilling adventures and affordable packages.',
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.className} ${playfair.className}`}>

      <head>

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
