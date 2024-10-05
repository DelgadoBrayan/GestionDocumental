import jwt from 'jsonwebtoken'

const checkAuth = (token: string): string | null =>{
    try {
        const secret = process.env.JWT_SECRET || 'palabrasecreta';
        const decoded = jwt.verify(token, secret) as {id:string}
        return decoded.id
    } catch (error) {
        console.error('Error al verificar el token', error)
        return null
    }
}

export default checkAuth;