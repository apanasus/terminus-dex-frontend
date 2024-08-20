import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram, faVk, faFacebook, faDiscord } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

import styles from "./socials.module.css";

type SocialsProps = {};

const Socials = (props: SocialsProps) => {
  return (
    <div className={`${styles.socials}`}>
      <Link
        href="https://github.com/TerminusFinance"
        target="blank"
        className={`${styles.socials_item} transition-colors duration-500`}
      >
        <FontAwesomeIcon icon={faGithub} width={20} />
      </Link>
      <Link
        href="https://t.me/TerminusDEX"
        target="blank"
        className={`${styles.socials_item} transition-colors duration-500`}
      >
        <FontAwesomeIcon icon={faTelegram} width={20} />
      </Link>
      <Link
        href="https://facebook.com"
        target="blank"
        className={`${styles.socials_item} transition-colors duration-500`}
      >
        <FontAwesomeIcon icon={faFacebook} width={20} />
      </Link>
      <Link href="https://vk.ru" target="blank" className={`${styles.socials_item} transition-colors duration-500`}>
        <FontAwesomeIcon icon={faVk} width={20} />
      </Link>
      <Link
        href="https://discord.com"
        target="blank"
        className={`${styles.socials_item} transition-colors duration-500`}
      >
        <FontAwesomeIcon icon={faDiscord} width={20} />
      </Link>
    </div>
  );
};

export default Socials;
