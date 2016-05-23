module.exports.jwtConfig = {
    secret: "somethingReal",
    tokenExpirationTime : 60*1, //seconds
    audience: "yoursite.net",
    issuer: "yourcompany@somewhere.com"
}
