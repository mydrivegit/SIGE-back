import jwt from 'jsonwebtoken'
// import User from '../models/user'
import dotEnv from 'dotenv'
//  dotenv config
dotEnv.config()

// const verifyToken = (req, res, next) => {
//   const token = req.headers['x-access-token']
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, process.env.JWT_SCRT1, function (err, decoded) {
//       if (err) {
//         return res.status(401).json({ 'error': true, 'message': 'Unauthorized access.' })
//       }
//       req.decoded = decoded
//       next()
//     })
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       'error': true,
//       'message': 'No token provided.'
//     })
//   }
// }
const verifyToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SCRT1)
    req.userData = decoded
    next()
  } catch (error) {
    res.status(401).send({
      message: 'Auth Failed'
    })
  }
}

export default verifyToken

// const refreshTokens = async (token, refreshToken, SECRET_1, SECRET_2) => {
//   let userId = -1
//   try {
//     const { user: { _id } } = jwt.decode(refreshToken)
//     userId = _id
//   } catch (err) { return { status: 401, message: 'Auth Failed' } }

//   if (!userId) { return { status: 401, message: 'Auth Failed' } }

//   const user = await User.findOne({ where: { _id: userId }, raw: true })

//   if (!user) { return { status: 401, message: 'Auth Failed' } }

//   const refreshSecret = SECRET_2 + user.password

//   try { jwt.verify(refreshToken, refreshSecret) } catch (err) {
//     return { status: 401, message: 'Auth Failed' }
//   }
//   let userDetail = {
//     username: user[0].username,
//     userId: user[0]._id,
//     userRole: user[0].role
//   }
//   let newToken = jwt.sign({ userDetail }, SECRET_1, { expiresIn: 20 })
//   let newRefreshToken = jwt.sign({ userDetail }, SECRET_2, { expiresIn: '1d' })
//   let response = {
//     message: 'New Token is Genetrated',
//     token: newToken,
//     refreshToken: newRefreshToken
//   }
//   return response
// }

// export const verifyToken = async (req, res, next) => {
//   const token = req.headers['x-token']
//   if (token) {
//     try {
//       const { decoded } = jwt.verify(token, process.env.JWT_SCRT1)
//       req.userData = decoded
//     } catch (err) {
//       const refreshToken = req.headers['x-refresh-token']
//       const newTokens = await refreshTokens(token, refreshToken, process.env.JWT_SCRT1, process.env.JWT_SCRT2)
//       if (newTokens.token && newTokens.refreshToken) {
//         res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
//         res.set('x-token', newTokens.token)
//         res.set('x-refresh-token', newTokens.refreshToken)
//       }
//       req.user = newTokens.user
//     }
//   }
//   next()
// }
