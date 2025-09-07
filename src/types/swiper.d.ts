import "swiper";

declare module "swiper" {
  interface NavigationOptions {
    enabled?: boolean;
    prevEl?: HTMLElement | null;
    nextEl?: HTMLElement | null;
  }
}
