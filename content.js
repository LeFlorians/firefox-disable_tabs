browser.runtime.onMessage.addListener(message => {
    if (message.plzUpdateTitle) {
        document.title = message.newTitle;
    }
})
