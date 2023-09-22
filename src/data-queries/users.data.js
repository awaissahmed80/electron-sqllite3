import { User } from "../models"
import { compareHash } from "../utils"
import uuid from 'uuid'

// import { dialog } from "electron"
const getUsers = () => {
    return new Promise((resolve, reject) => {
        User.findAll()
            .then((users) => {
                const data = users?.map((user) => user.toJSON())
                resolve(data)
            })
            .catch((err) =>{
                reject(err)
            })
    })
        
}

const login = ({username, password}) => {
    return User.findOne({
            where: { username: username },
            attributes: ['id', 'first_name', 'last_name', 'username', 'password', 'role', 'avatar']
        })        
        .then((user) => {
            if(compareHash(password, user.password)){

                const token = uuid.v4();                
                return User.update({authToken: token}, {where: {id: user.id}})
                        .then(() => {
                            console.log("Here", user)
                            return ({ user: {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                username: user.username,
                                id: user.id,
                                avatar: user.avatar,
                                role: user.role                        
                            }, token, error: null})
                        })
                        .catch((error) => {
                            console.log("Error" , error)
                        })
                
            }
            throw("Error")
        })
        .catch(() => {            
            return ({error: 'Invalid password', user: null})
        })    
}

const checkAuth = async (token) => {

    var user = await User.findOne({ authToken: token })
    if(user){
        return ({user: user.id})
    }else{
        return ({error: 'Invalid Token', user: null})
    }

}
export { getUsers, login, checkAuth }