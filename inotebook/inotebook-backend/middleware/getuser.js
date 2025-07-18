var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Yukiisagreatcoder';

const getuser = (req, res, next) =>{
    // get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    console.log(req.header)
    if (!token)
    {
        res.status(401).send({error: "please authenticate using a valid token"});
    }

    try
    {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) 
    {
        res.status(401).send({error: "please authenticate using a valid token"});
    }
    
}

module.exports = getuser;