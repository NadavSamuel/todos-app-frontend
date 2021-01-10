import cookie from 'cookie'

export function parseCookies(req) {
    console.log('req, ',req)
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}