import Sequelize  from 'sequelize'
import { sequelize } from '../config/db.config'
import { generateHash } from '../utils'

const { DataTypes } = Sequelize


const afterSync =  () =>{
    
    return User.findOne({ where: { username: 'admin' } }).then((adminUser) => {
      if (!adminUser) {
        return User.create({
            first_name: 'Admin',
            last_name: 'User',
            username: 'admin',
            avatar: 'avatar.png',
            password: generateHash('test1234'),
            role: 'ADMIN'
        })
      }
    })

}


const User = sequelize.define('users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        select: false
    },    
    authToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM,
        values: ['ADMIN','MANAGER','OPERATOR'],
        defaultValue: 'OPERATOR'
    }
    },{
        hooks: {
            afterSync
        },
        defaultScope: {
            attributes: { exclude: ['password', 'authToken'] }, // Exclude the 'password' column by default
        },
    }
    );




export { User };
