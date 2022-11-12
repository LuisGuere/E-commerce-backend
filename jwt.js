dot.env(config());

const jwt = require("jsonwebtoken");
const secret = ProductosPersonalizados;

const genarateToken = (payload) => {
    return jwt.sign(
        payload,
        secret
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

console.log(genarateToken({
    userType: 'admin',
    userId: '5'
}));

console.log(verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6ImFkbWluIiwidXNlcklkIjoiNSIsImlhdCI6MTY2NDYzNjQzOH0.K61Dgm8wFgMYY7OOqVpvZPpzNVxDiZ7sxPkTwNB1aV0'));