async function scrollToWindowBottom(): Promise<void> {
    const previousScrollPosition = window.pageYOffset;
    window.scrollTo(0, document.body.scrollHeight);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (previousScrollPosition !== window.pageYOffset) {
        await scrollToWindowBottom();
    }
}

export default scrollToWindowBottom;