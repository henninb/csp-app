const express = require('express');
const helmet  = require('helmet');
const path    = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://client.px-cloud.net",
        "https://captcha.px-cloud.net",
        "https://henninb.github.io",
        "'unsafe-inline'"
      ],
      styleSrc:  ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc:    ["'self'", "https://b.px-cdn.net", "https://henninb.github.io", "data:"],
      connectSrc:["'self'", "*.px-cloud.net","*.px-cdn.net","*.pxchk.net","*.px-client.net"],
      fontSrc:   ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      workerSrc: ["'self'", "https://client.px-cloud.net", "https://captcha.px-cloud.net", "blob:"],
      frameSrc:  ["'self'", "https://crcldu.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
    },
  })
);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CSP Demo</title>
        <script src="//client.px-cloud.net/PXjJ0cYtn9/main.min.js"
                async></script>
        <script src="/inline.js"></script>
        <script src="https://henninb.github.io/human-challenge/human-challenge.js"></script>
      </head>
      <body>
        <h1>CSP-enabled</h1>
        <h3>window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));</h3>
        <button onclick="window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));">Trigger Auto ABR Captcha</button>
        <script>
          console.log('Hello, world!');
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Listening on 3000"));
