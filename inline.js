// Create a new <script> element
const injected = document.createElement('script');
injected.textContent = `
  function logInlineWorld() {
    console.log('inline world!');
  }
`;

injected.type = 'text/javascript';
document.head.appendChild(injected);
