const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id) =>{
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "1m"})
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, email, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, email, password: hashPassword})
            await user.save()
            return res.json({message: "Пользователь создан", status: 200})
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id)
            return res.json({message: 'Вход выполнен', token, status: 200})
        } catch (e) {
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res){
        try {
            res.json("server work")
        } catch (e) {
            
        }
    }
}

module.exports = new authController()