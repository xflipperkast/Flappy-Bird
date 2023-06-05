function getCookie(cookieName = "maxScore") {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }

    }

    return "";
}

function setCookie(cookieName = "maxScore", cookieValue = 0) {
    const d = new Date();
    d.setTime(d.getTime() + (100000000000*24*60*60*1000));

    let expires = "expires="+ d.toUTCString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function checkCookie(cookieName = "maxScore", cookieValue = 0) {
    let cookie = getCookie(cookieName);

    if (cookie == "" || cookie == null) {
        setCookie(cookieName, cookieValue)
    }

}

function deleteCookie(cookieName = "maxScore") {
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}