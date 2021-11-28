import * as uuid from 'uuid'; //используется для создания уникального имени
import * as path from 'path';
import * as fs from 'fs';

//создаём имя файла,записываем его в папку static
class FileServise {
  saveFile(files) {
    // console.log(file);
    try {
      const fileNames = files.map((file) => {
        const fileName = uuid.v4() + '.jpg';
        const filePath = path.resolve('static', fileName);
        file.mv(filePath);
        return fileName;
      });
      return fileNames;
      // console.log(fileName);
    } catch (e) {
      console.log(e);
    }
  }
  // удаление файлов изи папки static
  deleteFile(fileNames) {
    // console.log(fileName);
    try {
      fileNames.map((file) => {
        const filePath = path.join('static', file);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, () => {});
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileServise();
