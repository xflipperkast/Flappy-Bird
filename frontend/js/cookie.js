function getMaxScoreFromCookie() {
    let name = "maxScore=";
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

// DO NOT USE! USE `checkCookie()` INSTEAD
function setMaxScoreCookie(cookieValue = 0) {
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    let cookie = "maxScore=" + cookieValue + ";" + expires.slice(0, -3) + "UTC;";
    document.cookie = cookie;
}

// This checks if a cookie for max score needs to be set
function checkMaxScoreCookie(cookieValue = 0) {
    let cookie = getMaxScoreFromCookie();

    if (cookie == "" || Number(cookie) < cookieValue) {
        setMaxScoreCookie(cookieValue)
    }

}

function deleteMaxScoreCookie() {
    document.cookie = "maxScore=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
