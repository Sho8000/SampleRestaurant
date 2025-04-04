import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';
import FooterCard from '../Cards/FooterCard';
import { ReactElement } from 'react';
import Styles from "./Footer.module.css"

interface footerCardData {
  footerCardTitle:string;
  contents?:string[];
  icons?:ReactElement[];
  type:"Pattern1"|"Pattern2";
}
const footerContact:footerCardData = {
  footerCardTitle:"Contact Us",
  contents:["123 Restaurant Street","City, State 12345", "Phone:(123)456-7890", "Email:info@restaurant.com"],
  type:"Pattern1"
}
const footerOpeningHours:footerCardData = {
  footerCardTitle:"Opening Hours",
  contents:["Monday-Friday:11:00 AM-10:00PM","Saturday-Sunday:10:00 AM-11:00PM"],
  type:"Pattern1"
}
const footerFollowUs:footerCardData = {
  footerCardTitle:"Follow Us",
  icons:[
  <a key={"icon1"} href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebook size={24} />
  </a>,
  <a key={"icon2"} href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={24} />
  </a>,
  <a key={"icon3"} href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter size={24} />
  </a>,
  <a key={"icon4"} href="https://yelp.com" target="_blank" rel="noopener noreferrer">
    <FaYelp size={24} />
  </a>
  ],
  type:"Pattern2"
}

export default function Footer() {
  return (
    <section className='bg-blue-950 py-[3rem]'>
      <div className={`flex justify-around gap-[1rem] ${Styles.footerConponent}`}>
        <FooterCard footerData={footerContact}/>
        <FooterCard footerData={footerOpeningHours}/>
        <FooterCard footerData={footerFollowUs}/>
      </div>
    </section>
  );
}