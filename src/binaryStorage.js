
const binaryStorageServer = 'http://localhost:3000/bin';

export function getBinaryURL(fileID) {
    return binaryStorageServer + '/' + fileID;
}