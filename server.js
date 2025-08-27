const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/convert', upload.single('pdf'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = inputPath + '_converted.pdf';

  const cmd = `gs -dPDFA=2 -dBATCH -dNOPAUSE -dNOOUTERSAVE -sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sPDFACompatibilityPolicy=1 -sOutputFile=${outputPath} ${inputPath}`;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Errore nella conversione.');
    }
    res.download(outputPath, 'converted.pdf', () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(process.env.PORT || 3000, () => console.log('✅ Server attivo'));
