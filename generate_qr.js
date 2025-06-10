// generate_single_qr.js
const QRCode = require('qrcode');

const url = ''; // ← 実際のURLに置き換えてください

QRCode.toFile('qrcode.png', url, function (err) {
  if (err) throw err;
  console.log('✅ QRコードが qrcode.png として生成されました');
});
