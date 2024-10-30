// cacheControl.js
export const noCache = (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
};
