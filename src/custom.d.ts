declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.ttf";
declare module "*.png";

interface Window {
  cerbymask: any;
}
