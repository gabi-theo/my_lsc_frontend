const setCookies = (name, value, daysToExpire) => {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

const loginCookies = (schools, role, userID, studentIDs) => {
  setCookies("schools", encodeURIComponent(JSON.stringify(schools)), 365);
  setCookies("role", role, 365);
  setCookies("userID", userID, 365);
  setCookies("studentIDs", studentIDs, 365);
};

const getCookie = (cookieName) => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf(cookieName + "=") === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length + 1));
    }
  }
  return null;
};

const deleteCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export { loginCookies };
export { getCookie };
export { deleteCookies };
export { setCookies };
