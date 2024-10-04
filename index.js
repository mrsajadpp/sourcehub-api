const express = require("express");
let handlebars = require('express-handlebars');
let cookieSession = require('cookie-session');

const app = express();

require("dotenv").config();
const redis = require('./redis')

const deleteKeys = async (pattern) => {
  const keys = await redis.keys(`${pattern}::*`)
  console.log(keys)
  if (keys.length > 0) {
    redis.del(keys)
  }
}

app.engine('hbs', handlebars.engine({
  extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/', partialsDir: __dirname + '/views/partials/', helpers: {
      ifequal: function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      formatNumber: (number) => {
          const units = ['K', 'M', 'B', 'T', 'P', 'E'];
          let unit = '';
          let num = number;

          for (let i = units.length - 1; i >= 0; i--) {
              const size = Math.pow(1000, i + 1);
              if (number >= size) {
                  num = number / size;
                  unit = units[i];
                  break;
              }
          }

          return num.toFixed(1).replace(/\.0$/, '') + unit;
      },
      formatDate: function (dateString) {
          const date = new Date(dateString);
          const options = { weekday: 'short', month: 'short', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);

          const [weekday, month, year] = formattedDate.split(' ');
          return `${weekday}, ${month} ${year}`;
      }
  }
}));

// app.use(session({ secret: "@tricbskt@#]$" }));
app.use(cookieSession({
  name: 'session',
  keys: ["@tricbgrvx@#{$"],
  maxAge: 30 * 24 * 60 * 60 * 1000
}))
app.set('view engine', 'hbs');

// app.use('/blog/', require('./route/blog'));
app.use('/', require('./route/user'));
// app.use('/auth/', require('./route/auth'));
// app.use('/admin/', require('./route/admin'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
