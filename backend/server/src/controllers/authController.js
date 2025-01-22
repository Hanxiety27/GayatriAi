const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt: jwtConfig, cookie: cookieConfig } = require('../config/auth');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, results) => {
                if (error) {
                    return res.status(500).json({
                        error: 'Database error occurred'
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        error: 'Invalid email or password'
                    });
                }

                const match = await bcrypt.compare(password, results[0].password);
                
                if (!match) {
                    return res.status(401).json({
                        error: 'Invalid email or password'
                    });
                }

                const token = jwt.sign(
                    { id: results[0].id },
                    jwtConfig.secret,
                    { expiresIn: jwtConfig.expiresIn }
                );

                res.cookie('token', token, cookieConfig);
                
                return res.json({
                    status: 'Success',
                    user: {
                        id: results[0].id,
                        name: results[0].name,
                        email: results[0].email
                    }
                });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
