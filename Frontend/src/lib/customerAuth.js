const TOKEN_KEY = "dps_customer_token";

export function getCustomerToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setCustomerToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
}

export function clearCustomerToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getCustomerSession() {
    const token = getCustomerToken();
    return token ? { access_token: token } : null;
}
