const forge = require('node-forge');
const fs = require('fs');

const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');
const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');

// keys starts here --
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

function rsaEncrypt(text) {
    const encrypted = publicKey.encrypt(text, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });
    return forge.util.encode64(encrypted);
  }
  
  function rsaDecrypt(encryptedText) {
    const decoded64 = forge.util.decode64(encryptedText);
    const decrypted = privateKey.decrypt(decoded64, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });
    return decrypted;
  }
  
  module.exports = {
    rsaEncrypt,
    rsaDecrypt,
  };
