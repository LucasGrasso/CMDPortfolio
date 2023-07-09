async function scrollToConsoleBottom(consoleContainer: HTMLDivElement | null): Promise<void> {
	if (!consoleContainer) return;
	const previousScrollPosition = consoleContainer.scrollTop;
	console.log("previousScrollPosition", previousScrollPosition);
	console.log("scrollTop", consoleContainer.scrollTop);
	consoleContainer.scrollTo(0, consoleContainer.scrollHeight);

	await new Promise(resolve => setTimeout(resolve, 500));

	if (previousScrollPosition !== consoleContainer.scrollTop) {
		await scrollToConsoleBottom(consoleContainer);
	}
}

export default scrollToConsoleBottom;