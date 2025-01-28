import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  
    // res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     maxAge: 3600,
    //     sameSite: 'strict',
    //     path: '/'
    // }));
    // return token;

return res 
.status(200)
.cookie("token", token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24*60*60*1000,
}
   
).json({
    success: true,
    message: message,
    user
})

};