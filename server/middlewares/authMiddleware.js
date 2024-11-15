const authMiddleware = (req, res, next) => {
    const token = req.header.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).send("Access Denied");
    }

    try{
        const decoded = jwt.verify(token, '62736d03bf2391f514d6df61dfa85b60538bad023324e5eb81926fbf803bdc62');
        req.user = decoded;
        next();
    } catch (error){
        res.status(400).send("Invalid token");
    }
}

export {authMiddleware};
