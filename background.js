function moveToNewWindow(tabId) {
    // When tab is created, move it directly into the new window
    browser.windows.create({
        tabId: tabId
    }).then(() => {
        console.log("The normal window has been created")
    })
}

browser.tabs.onCreated.addListener(tab => {
    moveToNewWindow(tab.id)
})

browser.tabs.onAttached.addListener((tabId, attachInfo) => {
    browser.windows.get(attachInfo.newWindowId, {
        populate: true
    }).then(info => {
        if (info.tabs.length > 1)
            moveToNewWindow(tabId)
    })
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.title.endsWith("]"))
        return
    title = tab.title.replace(/\s*\(\d+\)\s+/, "")
    if (title.length > 25)
        title = title.substring(0, 25) + "..."
    title += " [" + (new URL(tab.url).hostname).replace(/^www\./, "") + "]"
    browser.tabs.sendMessage(tabId, {
        plzUpdateTitle: true,
        newTitle: title
    });
})
