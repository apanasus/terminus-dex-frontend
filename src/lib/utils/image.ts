import React from "react";

// === === === === === === ===

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  // @ts-ignore
  event.target.id = "/static/images/icons/128/unknown-token-128.png";
  // @ts-ignore
  event.target.srcset = "/static/images/icons/128/unknown-token-128.png";
};

// === === === === === === ===
