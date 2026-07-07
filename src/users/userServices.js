const usersData = require('../data/users.json')
const userRepository = require('./userRepository.js')
const date = new Date().toLocaleString("pt-BR")

function getAllUsers () {
    try {
        return {
            requestTime: date,
            status: 'Success: API is running',
            version: '1.0.0',
            Users: userRepository.getAllUsers()  
        };
    } catch (error) {
        throw new Error(error.message)
    }
}

function getUserById (userId) {
    const id = Number(userId);
    try {
        const user = usersData.find(user => user.userId === id);
        if (!user) {
            return {
                requestTime: date,
                status: 'Error: User not found',
                version: '1.0.0',
                userData: null
            };
        }
        return {
            requestTime: date,
            status: 'Success: User found',
            version: '1.0.0',
            userData: user
        };
    } catch (error) {
        throw new Error(error.message)
    }
}

function getTokenForUser(email) {
    try {
        const user = usersData.find(un => un.email === email)
        const userStatus = user.state
        if (!user) {
            return {
                requestTime: date,
                status: 'Error: User not found, unable to get the access token',
                version: '1.0.0',
                userData: null
            };
        } else if (userStatus == "deactivated") {
            return {
                requestTime: date,
                status: 'Unable to get the access token, the user is deactivated',
                version: '1.0.0',
                userState: userStatus
            }
        }
        return {
            requestTime: date,
            status: "Success",
            token: generateToken(email)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

function generateToken(email) {
    if (!email) {
        return error;
        console.log(`Unable to generate the token user is not defined: user: ${email}`)
    }
    return {
        token: "Aqui vai o token......"
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    getTokenForUser
}