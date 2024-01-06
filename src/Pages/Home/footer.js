import React from "react";
import "./home2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content-div">
          <h2>Contact </h2>
          <a href="./about" target="_blank" rel="noopener noreferrer">
            About us
          </a>
          <a href="./about" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
          <a
            href="https://www.google.com/search?rlz=1C1CHBF_enIN1002IN1002&sca_esv=596181589&cs=1&output=search&q=Sawariya+Bakers&ludocid=2724315140083656992&lsig=AB86z5WH5whEYW6z55T1lPYhPrW4&kgs=6219b60d13464329&shndl=-1&source=sh/x/loc/act/m4/2#trex=m_t:lcl_akp,rc_f:rln,rc_ludocids:2724315140083656992,ru_gwp:0%252C7,ru_lqi:ChhjYWtlIHNob3AgaW4gc2FrcmkgYmloYXJIwPe_8oG1gIAIWjIQABABGAAYARgDGAQiGGNha2Ugc2hvcCBpbiBzYWtyaSBiaWhhcioGCAMQABABMgJoaZIBCWNha2Vfc2hvcKoBWgoIL20vMGZzenQQASoNIgljYWtlIHNob3AoIzIfEAEiG6BT_A2_is4jGRB-9D7yxxQLsH1w5iCJ5_iGFzIcEAIiGGNha2Ugc2hvcCBpbiBzYWtyaSBiaWhhcg,ru_phdesc:UPULTDGkGIA,trex_id:UwO9&lpg=cid:CgIgAQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </div>
        <div className="footer-content-div">
          <h2>Links</h2>
          <a href="./cart" target="_blank" rel="noopener noreferrer">
            Cart
          </a>
          <a href="./orders" target="_blank" rel="noopener noreferrer">
            Orders
          </a>

          <a href="./dashboard" target="_blank" rel="noopener noreferrer">
            Login/Logout
          </a>
        </div>
        <div className="footer-content-div">
          <h2>Cakes </h2>
          <a href="./cakes" target="_blank" rel="noopener noreferrer">
            Chocolate
          </a>
          <a href="./cakes" target="_blank" rel="noopener noreferrer">
            pinapple
          </a>
          <a href="./cakes" target="_blank" rel="noopener noreferrer">
            vanilla
          </a>
          <a href="./cakes" target="_blank" rel="noopener noreferrer">
            butterscotch
          </a>
        </div>
        <div className="icon-div">
          <a
            href="https://www.instagram.com/sawariya_bakers/"
            className="social-icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} bounce size="2xl" />
          </a>
          <a
            href="https://www.google.com"
            className="social-icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} bounce size="2xl" />
          </a>
          <a
            href="mailto:yashladia01@gmail.com"
            className="social-icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} bounce size="2xl" />
          </a>
          <a
            href="https://www.google.com/search?rlz=1C1CHBF_enIN1002IN1002&sca_esv=596181589&cs=1&output=search&q=Sawariya+Bakers&ludocid=2724315140083656992&lsig=AB86z5WH5whEYW6z55T1lPYhPrW4&kgs=6219b60d13464329&shndl=-1&source=sh/x/loc/act/m4/2#trex=m_t:lcl_akp,rc_f:rln,rc_ludocids:2724315140083656992,ru_gwp:0%252C7,ru_lqi:ChhjYWtlIHNob3AgaW4gc2FrcmkgYmloYXJIwPe_8oG1gIAIWjIQABABGAAYARgDGAQiGGNha2Ugc2hvcCBpbiBzYWtyaSBiaWhhcioGCAMQABABMgJoaZIBCWNha2Vfc2hvcKoBWgoIL20vMGZzenQQASoNIgljYWtlIHNob3AoIzIfEAEiG6BT_A2_is4jGRB-9D7yxxQLsH1w5iCJ5_iGFzIcEAIiGGNha2Ugc2hvcCBpbiBzYWtyaSBiaWhhcg,ru_phdesc:UPULTDGkGIA,trex_id:UwO9&lpg=cid:CgIgAQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icons"
          >
            <FontAwesomeIcon icon={faGoogle} bounce size="2xl" />
          </a>
        </div>
      </div>
      <div className="auther">
        <p>&copy; 2024 Sawariya. Designed and developed by Utsav Ladia.</p>
      </div>
    </>
  );
}

export default Footer;
