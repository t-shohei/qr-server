// generate_single_qr.js
const QRCode = require('qrcode');

const url = 'https://www.google.com/search?q=%E5%B8%AD%E6%B1%BA%E3%82%81%E8%8B%B1%E8%AA%9E&rlz=1C1AWDP_enJP950JP950&oq=%E5%B8%AD%E6%B1%BA%E3%82%81%E8%8B%B1%E8%AA%9E&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIKCAIQABiABBiiBDIHCAMQABjvBTIKCAQQABiABBiiBDIKCAUQABiiBBiJBdIBCDQxNzZqMGo3qAIIsAIB8QXdgLf401um1Q&sourceid=chrome&ie=UTF-8'; // ← 実際のURLに置き換えてください

QRCode.toFile('qrcode.png', url, function (err) {
  if (err) throw err;
  console.log('✅ QRコードが qrcode.png として生成されました');
});
