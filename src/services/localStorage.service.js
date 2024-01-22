function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to get a value from local storage by key
function getLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}

// Function to remove a key-value pair from local storage
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

function checkCookie(name) {
    // Split the document.cookie string into individual cookies
    var cookies = document.cookie.split(';');

    // Loop through the cookies to find the one with the specified name
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Check if the cookie starts with the specified name
        if (cookie.indexOf(name + '=') === 0) {
            // Cookie found
            return true;
        }
    }

    // Cookie not found
    return false;
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    checkCookie
}