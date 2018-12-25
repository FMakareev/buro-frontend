/* global PORT */
import register from 'ignore-styles';
import express from 'express';
import requestLanguage from 'express-request-language';
import cookieParser from 'cookie-parser';
import formidable from 'formidable';
import fs from 'fs';
import { Root } from './root';
import {EXCEL_DOWNLOAD, EXCEL_UPLOAD} from "@lib/shared/endpoints";
const form = new formidable.IncomingForm();

const app = express();
const jsonTranslate = require('../store/reducers/localization/localization.json');

const langArray = jsonTranslate.map(item => item.code);

app.use(express.static('public'));
app.use(cookieParser());

if (langArray.length) {
  app.use(
    requestLanguage({
      languages: langArray,
      queryName: 'lang',
      cookie: {
        name: 'lang',
        options: {
          path: '/',
          maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
        },
        url: '/lang/{language}',
      },
    }),
  );
}
app.post('/node'+EXCEL_DOWNLOAD, function (req, response){
  response.set('Content-Type', 'text/xml');
  response.set('Content-Disposition', 'form-data; filename="download.xml"');

  response.send(`<toys>
    <toy>Transformers</toy>
    <toy>GI Joe</toy>
    <toy>He-man</toy>
</toys>`);
});
app.post(EXCEL_UPLOAD, function (req, res){
  form.parse(req);

  form.on('fileBegin', function (name, file){
    if(!fs.existsSync(process.cwd() + '/public/uploads/')){
      fs.mkdirSync(process.cwd() + '/public/uploads/');
    }
    file.path = process.cwd() + '/public/uploads/' + file.name;
  });

  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });
  form.on('field', function(name, value) {
    console.log('field: ',name, value);
  });
  res.send('Good!');
});


/**
 * @description http://expressjs.com/en/4x/api.html#app.get.method
 * */
app.use('*', Root);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}. !!!!!!!!`);
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('../modules');
}
export default app;
