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
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSP Demo - Unsafe Inline Implementation</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #ff7b7b 0%, #ff6b35 100%);
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
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
          }
          
          .warning-badge {
            display: inline-block;
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 500;
            margin-left: 10px;
          }
          
          h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #ff7b7b, #ff6b35);
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
            border-left: 4px solid #e74c3c;
          }
          
          .btn {
            background: linear-gradient(45deg, #ff7b7b, #ff6b35);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 123, 123, 0.4);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 123, 123, 0.6);
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
            border-left: 4px solid #ff7b7b;
          }
          
          .info-card.warning {
            border-left-color: #e74c3c;
            background: #fdf2f2;
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
          
          .info-card.warning p {
            color: #c0392b;
          }
          
          .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #ff6b35;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .security-notice {
            background: linear-gradient(45deg, #ffeaa7, #fdcb6e);
            border: 1px solid #e17055;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            color: #2d3436;
            font-weight: 500;
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
                async></script>
        <script src="/inline.js"></script>
        <script src="https://henninb.github.io/human-challenge/human-challenge.js"></script>
      </head>
      <body>
        <div class="container">
          <div class="badge">
            <span class="status-indicator"></span>
            Unsafe-inline CSP
            <span class="warning-badge">⚠️ DEV MODE</span>
          </div>
          
          <h1>Content Security Policy Demo</h1>
          <p class="subtitle">Testing unsafe-inline script execution with PerimeterX integration</p>
          
          <div class="security-notice">
            ⚠️ <strong>Development Mode:</strong> This implementation uses 'unsafe-inline' CSP directive. 
            Not recommended for production environments.
          </div>
          
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
            <div class="info-card warning">
              <h3>⚠️ Security Level</h3>
              <p>Lower - Using 'unsafe-inline' CSP directive. Easier development but less secure than nonce-based approach</p>
            </div>
            
            <div class="info-card">
              <h3>🛡️ Protection</h3>
              <p>PerimeterX bot detection and human challenge integration enabled</p>
            </div>
            
            <div class="info-card">
              <h3>⚡ Performance</h3>
              <p>Fast development cycle with inline scripts allowed, but potential security trade-offs</p>
            </div>
            
            <div class="info-card">
              <h3>🎯 Implementation</h3>
              <p>Express.js server with Helmet middleware using relaxed CSP settings</p>
            </div>
          </div>
        </div>
        
        <script>
          console.log('🎉 CSP Demo initialized with unsafe-inline mode!');
          console.warn('⚠️ This is running in development mode with relaxed CSP settings');
          
          // Add some interactive feedback
          document.querySelector('.btn').addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          });
          
          // Show security warning in console
          setTimeout(() => {
            console.warn('%c⚠️ SECURITY NOTICE', 'color: #e74c3c; font-size: 16px; font-weight: bold;');
            console.warn('This demo uses unsafe-inline CSP which allows inline scripts.');
            console.warn('For production, consider using nonce-based CSP (see index-nonce.js)');
          }, 1000);
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Listening on 3000"));
