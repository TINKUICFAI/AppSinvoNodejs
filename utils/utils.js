// const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
// const { v4: uuid } = require("uuid");

// const dateutils = require("./date");

const storagePath = {
    image: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}image`),
    pdf: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}pdf`),
    audio: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}audio`),
    docs: path.resolve(__dirname, `..${path.sep}..${path.sep}`, `data${path.sep}docs`),
};

exports.storagePath = storagePath;

// exports.getFilePathName = (type) => {
//     const id = `${uuid()}-${dateutils.getUTCTimestamp()}`;

//     switch (type) {
//         case "image": {
//             if (!fs.existsSync(storagePath.image)) {
//                 fs.mkdirSync(storagePath.image, { recursive: true });
//             }

//             return { filename: path.resolve(storagePath.image, `${id}.jpeg`), fileId: id };
//         }

//         case "pdf": {
//             if (!fs.existsSync(storagePath.pdf)) {
//                 fs.mkdirSync(storagePath.pdf, { recursive: true });
//             }

//             return { filename: path.resolve(storagePath.pdf, `${id}.pdf`), fileId: id };
//         }

//         case "audio": {
//             if (!fs.existsSync(storagePath.audio)) {
//                 fs.mkdirSync(storagePath.audio, { recursive: true });
//             }

//             return { filename: path.resolve(storagePath.audio, `${id}.aac`), fileId: id };
//         }

//         default: {
//             return null;
//         }
//     }
// };

exports.getFilePath = ({ type, id }) => {
    switch (type) {
        case "image": {
            return `${storagePath.image}${path.sep}${id}.jpeg`;
        }

        case "pdf": {
            return `${storagePath.pdf}${path.sep}${id}.pdf`;
        }

        case "audio": {
            return `${storagePath.audio}${path.sep}${id}.aac`;
        }

        default:
            return null;
    }
};

exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

exports.compareHashPassword = (password, hashPassword) => {
    const same = bcrypt.compareSync(password, hashPassword);
    return same;
};

exports.validateObjectKeys = (obj = {}, keys = []) => {
    const objKeys = Object.keys(obj);

    if (objKeys.every((key) => keys.includes(key))) {
        return true;
    }

    return false;
};

exports.generateRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
