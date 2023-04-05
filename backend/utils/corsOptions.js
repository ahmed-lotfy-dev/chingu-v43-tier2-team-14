var allowedDomains = ['http://localhost:5173', 'https://https://v43-frontend.ahmedlotfy.me/', 'https://v43-tier2-team14-frontend.onrender.com'];

export const corsOptions = {
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}
