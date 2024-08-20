import React from "react";
import styles from "./backgroundBlur.module.css";

type Props = {};

const BackgroundBlur = (props: Props) => {
  return (
    <div className={`${styles.background_blur} -z-10`}>
      <div className={styles.rectangle1}></div>
      <div className={styles.rectangle2}></div>
      <div className={styles.rectangle3}></div>
      <div className={styles.rectangle4}></div>
    </div>
  );
};

export default BackgroundBlur;
