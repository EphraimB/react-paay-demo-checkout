const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const pool = require('./db');

passport.use(
    new LocalStrategy((username, password, done) => {
        pool.query("SELECT * FROM users WHERE username = $1", [username], (err, results) => {
            if (err) return done(err);
            if (results.rows.length === 0) {
                return done(null, false, { message: "Username not found" });
            }

            const user = results.rows[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            });
        });
    }));

passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE user_id = $1", [id], (err, results) => {
        done(err, results.rows[0]);
    });
});

module.exports = passport;