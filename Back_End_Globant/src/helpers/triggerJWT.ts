import jwt from 'jsonwebtoken'

const triggerJWT = (id:string)=>{
    return jwt.sign({id}, process.env.JWT_SECRET! || 'palabrasecreta',{
        expiresIn: '7d',
    });
}

export default triggerJWT;