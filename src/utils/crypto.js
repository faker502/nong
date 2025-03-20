import CryptoJS from "crypto-js";

export default {
  encryptToHex: function (word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    let data = encrypted.ciphertext.toString();
    return data;
  },
  decryptForHex: function (word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  encryptToBase64: function (word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  decryptForBase64: function (word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
};
