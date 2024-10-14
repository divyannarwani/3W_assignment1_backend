const adminUsername = 'admin';
const adminPassword = '123456';

export const adminLogin = (req, res, next) => {
    const { username, password } = req.headers; 

    if (username === adminUsername && password === adminPassword) {
        next(); // Allow access to the route
    } else {
        return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
    }
};