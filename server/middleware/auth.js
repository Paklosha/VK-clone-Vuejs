const jwt = require('jsonwebtoken')
const User = require('../mongodb/models/user')

const auth = async(req, res, next) => {
    console.log('before the if statement is  '+req.header('Authorization'))
    if(typeof req.header('Authorization') == 'undefined') return res.sendStatus(403)
    console.log(req.header('Authorization'))
    console.log('OOOOPPPPSSSS.....')
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = auth