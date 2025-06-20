// app/layout.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapClient from "../components/BootstrapClient";


export const metadata = {
  title: 'Desert Safari Dubai | Best Safari Experience',
  description: 'Enjoy the best desert safari in Dubai with thrilling adventures and affordable packages.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <BootstrapClient />
      <body>{children}</body>
    </html>
  );
}
