const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const pool = require('./db');

passport.use(
    "local-login",
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

passport.serializeUser((user, done) => done(null, {
    user_id: user.user_id,
    username: user.username,
    is_admin: user.is_admin
}));
passport.deserializeUser((user, done) => {
    pool.query("SELECT * FROM users WHERE user_id = $1", [user.user_id], (err, results) => {
        if (err) return done(err);

        if (results.rows.length == 0) return done(null, false);
        const user = results.rows[0];
        done(null, user);
    });
});

module.exports = passport;