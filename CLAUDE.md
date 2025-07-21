# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Content Security Policy (CSP) exploration tool that demonstrates two different approaches to CSP implementation in Express.js applications:

1. **Nonce-based CSP** (`index-nonce.js`) - Uses static nonce values for more secure script execution
2. **unsafe-inline CSP** (`index-unsafe-inline.js`) - Uses `'unsafe-inline'` directive for easier development but less security

Both implementations integrate with PerimeterX (PX) security services and include a human challenge demo.

## Commands

### Start the servers:
```bash
# Nonce-based CSP server (more secure)
node index-nonce.js

# unsafe-inline CSP server (development/testing)
node index-unsafe-inline.js
```

### Install dependencies:
```bash
npm install
```

### Test the demo:
After starting either server, open browser dev tools and run:
```javascript
window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));
```

## Architecture

### Core Files
- `index-nonce.js` - Express server with nonce-based CSP headers using Helmet middleware
- `index-unsafe-inline.js` - Express server with unsafe-inline CSP headers  
- `inline.js` - Client-side script that dynamically injects JavaScript (used to test CSP behavior)

### CSP Configuration
Both servers use Helmet middleware to set CSP headers with directives allowing:
- PerimeterX domains (`*.px-cloud.net`, `*.px-cdn.net`, etc.)
- External challenge script from `henninb.github.io`
- Self-hosted resources
- The main difference is script execution: nonce vs unsafe-inline

### Security Integration
The project integrates with PerimeterX for bot detection and includes a human challenge system. The CSP policies are specifically configured to allow these security services while demonstrating different CSP approaches.