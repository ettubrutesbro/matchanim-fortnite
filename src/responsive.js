import theme from "./theme";
import { css } from "styled-components";

const sizes = {
  giant: 1600,
  desktop: 1300,
  laptop: 1080,
  tablet_wide: 960,
  tablet: 768,
  phone_wide: 600,
  phone: 480,
  phone_small: 400
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}rem) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const customMedia = sizeInPixels => {
  const emSize = sizeInPixels / 16;
  return (...args) => css`
    @media (max-width: ${emSize}rem) {
      ${css(...args)};
    }
  `;
};
