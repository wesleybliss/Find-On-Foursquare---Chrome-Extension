function buildFoursquareURL( query ) {
    return 'https://foursquare.com/explore?' +
        'mode=url&near=New%20York&q=' + query;
}

function hasSelectedText( info ) {
    return info.selectionText
        && info.selectionText.trim().length > 0;
}

function onClickHandler( info, tab ) {
    
    if ( !hasSelectedText(info) ) return false;
    
    chrome.tabs.create({
        index: ( tab.index + 1 ),
        active: true,
        selected: true,
        url: buildFoursquareURL( info.selectionText )
    });
    
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    
    // Create one test item for each context type.
    var contexts = [
        "page",
        "selection",
        "link",
        "editable",
        "image",
        "video",
        "audio"
    ];
    
    chrome.contextMenus.create({
        "id": "fofparent",
        "title": "Find On Foursquare",
        "contexts": contexts
    });
    
});
