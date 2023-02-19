type ScrollLockProps = HTMLElement | Document;

declare module 'body-scroll-lock' {
    export function disableBodyScroll(targetElement: ScrollLockProps): void;
    export function enableBodyScroll(targetElement: ScrollLockProps): void;
}