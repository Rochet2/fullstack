const users = {
    "pertti": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QzIiwiaWQiOiI1YTk4NWQzODg0N2Y2ODYxMDFmYjA0NTgiLCJpYXQiOjE1MjAwMDEwNTN9.dic4kYtumtc0GKafCWAZoem-4PcMeW07mpzcJjde9k8",
        "username": "pertti",
        "name": "Pertti"
    }
}

const logIn = async (username, password) => {
    return Promise.resolve(users[username])
}

export default { logIn, users }