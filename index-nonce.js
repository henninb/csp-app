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
        "https://henninb.github.io",
        "https://client.px-cloud.net",
        "https://captcha.px-cloud.net",
        "'sha256-TGMxngC0JPlmaMR1VzjW2skZGVjPxVPEpaZRmsu0ot0='",
        "'nonce-static12345'"
      ],
      styleSrc:  ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc:    ["'self'", "https://henninb.github.io", "https://b.px-cdn.net", "data:"],
      connectSrc:["'self'", "*.px-cloud.net","*.px-cdn.net","*.pxchk.net","*.px-client.net"],
      fontSrc:   ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      workerSrc: ["'self'", "https://client.px-cloud.net", "https://captcha.px-cloud.net", "blob:"],
      frameSrc:  ["'self'", "https://crcldu.com"],
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
                async
                nonce="static12345"></script>
        <script src="/inline.js"
                nonce="static12345"></script>
        <script src="https://henninb.github.io/human-challenge/human-challenge.js"></script>
      </head>
      <body>
        <h1>CSP-enabled</h1>
        <h3>window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));</h3>
        <script nonce="static12345">
          console.log('Hello, world!');
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Listening on 3000"));
