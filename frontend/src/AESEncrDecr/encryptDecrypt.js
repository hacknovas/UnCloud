import CryptoJS from "crypto-js";

export const createSecret256 = () => {
  const symmetricKeyArray = CryptoJS.lib.WordArray.random(32);
  const secret_Key = symmetricKeyArray.toString(CryptoJS.enc.Hex);
  return secret_Key;
};

export function encrypt(input, secretKey) {
  return new Promise((resolve, reject) => {
    var file = input;
    var reader = new FileReader();

    reader.onload = () => {
      var wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
      var encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

      var fileEnc = new Blob([encrypted]); // Create blob from string

      resolve(fileEnc);
    };

    reader.readAsArrayBuffer(file);
  });
}

function convertWordArrayToUint8Array(wordArray) {
  const arrayOfWords = wordArray.words; // Optional chaining not strictly necessary here
  const length = wordArray.sigBytes || arrayOfWords.length * 4;
  const uInt8Array = new Uint8Array(length);
  let index = 0;

  for (let i = 0; i < length; i += 4) {
    const word = arrayOfWords[i / 4];
    uInt8Array[index++] = (word >> 24) & 0xff;
    uInt8Array[index++] = (word >> 16) & 0xff;
    uInt8Array[index++] = (word >> 8) & 0xff;
    uInt8Array[index++] = word & 0xff;
  }

  return uInt8Array;
}

export function decrypt(input, fileType, secretKey) {
  var file = input;
  var reader = new FileReader();

  reader.onload = () => {
    var decrypted = CryptoJS.AES.decrypt(reader.result, secretKey); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
    var typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array
    // var fileDec = new Blob([typedArray]);

    // const fileType = file.name.substr(0, file.name.length - 4).split(".")[1];
    if (
      fileType == "jpg" ||
      fileType == "jpeg" ||
      fileType == "png" ||
      fileType == "gif"
    ) {
      var fileDec = new Blob([typedArray], { type: `image/${fileType}` }); // Create blob from typed array
    } else if (fileType == "pdf") {
      var fileDec = new Blob([typedArray], { type: `application/${fileType}` }); // Create blob from typed array
    } else if (fileType == "txt") {
      var fileDec = new Blob([typedArray], { type: `text/${fileType}` }); // Create blob from typed array
    }

    // Download file
    // var a = document.createElement("a");
    // var url = window.URL.createObjectURL(fileDec);
    // // var filename = file.name.substr(0, file.name.length - 4) + ".dec";
    // var filename = file.name.substr(0, file.name.length - 4);
    // a.href = url;
    // a.download = filename;
    // a.click();
    // window.URL.revokeObjectURL(url);

    // New Window open
    var blobURL = URL.createObjectURL(fileDec);
    var newWindow = window.open(blobURL, "_blank");
    URL.revokeObjectURL(blobURL);
    console.log("file");
  };

  reader.readAsText(file);
}
