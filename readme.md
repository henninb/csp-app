# 🔍 CSP Exploration Tool

## 📦 Prerequisites

Install dependencies:

```bash
npm install
```

---

## 🚀 Usage

### 1. Using **Nonce**

1. **Start the server**  
   ```bash
   node index-nonce.js
   ```
2. **Open Developer Tools** in your browser and switch to the **Console** tab.  
3. **Trigger the demo**:  
   ```js
   window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));
   ```

---

### 2. Using **`unsafe-inline`**

1. **Start the server**  
   ```bash
   node index-unsafe-inline.js
   ```
2. **Open Developer Tools** in your browser and switch to the **Console** tab.  
3. **Trigger the demo**:  
   ```js
   window.dispatchEvent(new Event('triggerPxAutoAbrCaptchaDemo'));
   ```

---

> **💡 Tip:**  
> - **Nonce-based CSP** gives you fine-grained control and stronger security.  
> - **`unsafe-inline`** is easier to test but less secure—use it only in development or trusted environments.

