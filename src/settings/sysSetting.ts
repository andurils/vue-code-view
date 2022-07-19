import type { DropdownItem, DropdownItemChild } from "types/vcv";

export const screenSizes: DropdownItem[] = [
  { label: "Default", key: [0, 0] },
  {
    label: "phone",
    items: [
      { label: "Moto 4G", key: [360, 640] },
      { label: "Galaxy S5", key: [360, 640] },
      { label: "Pixel 2", key: [411, 731] },
      { label: "Pixel 2 XL", key: [411, 823] },
      { label: "iPhone 5/SE", key: [320, 568] },
      { label: "iPhone 6/7/8", key: [375, 667] },
      { label: "iPhone 6/7/8 Plus", key: [414, 736] },
      { label: "iPhone X", key: [375, 812] },
    ],
  },
  {
    label: "pad",
    items: [
      { label: "iPad", key: [768, 1024] },
      { label: "iPad Pro", key: [1024, 1366] },
      { label: "Surface Duo", key: [540, 720] },
      { label: "Galaxy Fold", key: [280, 653] },
    ],
  },
];

// {
//   "Default": [0, 0],
//   "Moto 4G": [360, 640],
//   "Galaxy S5": [360, 640],
//   "Pixel 2": [411, 731],
//   "Pixel 2 XL": [411, 823],
//   "iPhone 5/SE": [320, 568],
//   "iPhone 6/7/8": [375, 667],
//   "iPhone 6/7/8 Plus": [414, 736],
//   "iPhone X": [375, 812],
//   "iPad": [768, 1024],
//   "iPad Pro": [1024, 1366],
//   "Surface Duo": [540, 720],
//   "Galaxy Fold": [280, 653]
// }

export const dockSides: DropdownItem[] = [
  { label: "top", key: "top", icon: "mdi:dock-top" },
  { label: "right", key: "right", icon: "mdi:dock-right" },
  { label: "left", key: "left", icon: "mdi:dock-left" },
];
