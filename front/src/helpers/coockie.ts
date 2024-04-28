export function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');

    
    if (name === cookieName) {
      return decodeURIComponent(value);
    } 
  } 

  return null;
}

export function setCookie(cookieName: string, cookieValue: string | boolean, daysToExpire: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
}

export function deleteCookie(cookieName: string) {
  document.cookie = `${encodeURIComponent(cookieName)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${encodeURIComponent(cookieName)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;`;
}
