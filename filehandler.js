const input = document.querySelector('#documents');
const preview = document.querySelector('.preview');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
    const curFiles = input.files;
    if (curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'アップロードするファイルが選択されていません';
      preview.appendChild(para);
    } else {
      const list = document.createElement('ol');
      preview.appendChild(list);
  
      for (const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');
        if (validFileType(file)) {
          para.textContent = `ファイル名: ${file.name}, ファイルの長さ: ${returnFileSize(file.size)}.`;
          const image = document.createElement('img');
          image.src = URL.createObjectURL(file);
  
          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `ファイル名: ${file.name}: ファイル形式が有効ではありません。選択しなおしてください。`;
          listItem.appendChild(para);
        }
  
        list.appendChild(listItem);
      }
    }
  }

  const fileTypes = [
    "application/pdf"
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} バイト`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }