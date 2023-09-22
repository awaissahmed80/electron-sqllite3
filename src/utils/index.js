import bcrypt from 'bcryptjs'

export const generateHash = (str) => {
    let salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(str, salt);

    return hash;
}

export const compareHash = (str, hash) => {
    return bcrypt.compareSync(str, hash)

}
