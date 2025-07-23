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
      scriptSrcAttr: ["'unsafe-hashes'", "'sha256-r06el5nj4LzzeyLsM66siXSsDoaaE/F53fM5c7PzsO0='"],
    },
  })
);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSP Demo - Nonce Implementation</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
          }
          
          .badge {
            display: inline-block;
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
          }
          
          h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .subtitle {
            color: #7f8c8d;
            font-size: 1.1rem;
            margin-bottom: 30px;
            font-weight: 400;
          }
          
          .demo-section {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #e9ecef;
          }
          
          .code-snippet {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px 20px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            margin: 20px 0;
            text-align: left;
            overflow-x: auto;
            border-left: 4px solid #3498db;
          }
          
          .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          }
          
          .btn:active {
            transform: translateY(0);
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }
          
          .info-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            border-left: 4px solid #667eea;
          }
          
          .info-card h3 {
            color: #2c3e50;
            font-size: 1.1rem;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .info-card p {
            color: #7f8c8d;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          
          .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 30px 20px;
            }
            
            h1 {
              font-size: 2rem;
            }
            
            .info-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <script src="//client.px-cloud.net/PXjJ0cYtn9/main.min.js"
                async
                nonce="static12345"></script>
        <script src="/inline.js"
                nonce="static12345"></script>
        <script src="https://henninb.github.io/human-challenge/human-challenge.js"></script>
      </head>
      <body>
        <div class="container">
          <div class="badge">
            <span class="status-indicator"></span>
            Nonce-based CSP
          </div>
          
          <h1>Content Security Policy Demo</h1>
          <p class="subtitle">Testing nonce-based script execution with PerimeterX integration</p>
          
          <div class="demo-section">
            <h3>🧪 Test the Human Challenge</h3>
            <p>Click the button below to trigger the PerimeterX Auto ABR Captcha demo</p>
            
            <div class="code-snippet">
              window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));
            </div>
            
            <button class="btn" onclick="window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));">
              🚀 Trigger Auto ABR Captcha
            </button>
          </div>
          
          <div class="info-grid">
            <div class="info-card">
              <h3>🔒 Security Level</h3>
              <p>High - Using nonce-based CSP with static nonce values for secure script execution</p>
            </div>
            
            <div class="info-card">
              <h3>🛡️ Protection</h3>
              <p>PerimeterX bot detection and human challenge integration enabled</p>
            </div>
            
            <div class="info-card">
              <h3>⚡ Performance</h3>
              <p>Optimized with async script loading and minimal inline JavaScript</p>
            </div>
            
            <div class="info-card">
              <h3>🎯 Implementation</h3>
              <p>Express.js server with Helmet middleware for CSP header management</p>
            </div>
          </div>
        </div>
        
        <script nonce="static12345">
          console.log('🎉 CSP Demo initialized with nonce-based security!');
          
          // Add some interactive feedback
          document.querySelector('.btn').addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Listening on 3000"));
