'use client';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/bootstrap.css';

const PhoneInput = dynamic(
  () => import('react-phone-input-2').then((mod) => mod.default),
  { ssr: false }
);

export default PhoneInput;
