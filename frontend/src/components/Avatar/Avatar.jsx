import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ hasBorder = true, ...rest }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...rest}
    />
  );
}

export default Avatar;
