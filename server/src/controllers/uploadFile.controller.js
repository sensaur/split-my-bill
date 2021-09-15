const { Bill, Bill_Split, Item, IMG } = require("../db/models");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
  keyFilename: "GoogeVisionAPIKey.json",
});
const { nanoid } = require('nanoid')
// console.log(client);

const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const config = {
  lang: "rus", // default
  oem: 3,
  psm: 3,
};

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

const uploadOneFile = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const billUrl = url + "/" + req.file.filename;
    const id = req.body.id;
    const imgUrl = await IMG.create({ user_id: id, url: billUrl });
    async function main() {
      try {
        // console.log("стартую")
        const filename = `src/public/uploads/${req.file.filename}`;
        const [result] = await client.textDetection(filename);
        const step00 = result.fullTextAnnotation.text.replace(
          /В том числе НДС 20%/gi,
          "toDel"
        );
        const step01 = step00.replace(/В том числе НДС 10%/gi, "toDel");
        const step02 = step01.replace(/ИНН поставщика/gi, "toDel");
        const step03 = step02.replace(/Товар \/ Полный расчет/gi, "toDel");
        const step04 = step03.replace(/9718101499/gi, "toDel");
        const step05 = step04.replace(/Р/g, "P");
        const step06 = step05.replace(/%3D/gi, "= ");
        const step07 = step06.replace(/х 1 -/gi, "х 1 =");
        const step08 = step07.replace(/ x /gi, " х ");
        const step09 = step08.replace(/%3/gi, " =");
        const step10 = step09.match(/(\d.+)/gi);
        const step11 = step10.toString();
        const step12 = step11.slice(0, step11.length - 1);
        const step13 = step12.replace(/P,/g, "<newItem>");
        const step14 = step13.replace(/,/g, " ");
        const step15 = step14.split("<newItem>");
        const step16 = step15.map((el) => el.split(" = "));
        console.log("step16", step16)
        const step17 = step16.map((el, i) =>
          step10.length === i ? (el[i][1] = "139.00") : el
        );
        console.log("step17", step17)
        const step18 = step17.map((el) => {
          return el.map((element, index) => {
            if (index === 0) {
              return element.split(" х ");
            }
            return element;
          });
        });
        console.log("step18", step18)
        const step19 = step18.map((el) => {
          return el.flat();
        });
        const step20 = step19.map((el) => {
          return el.map((element, index) => {
            if (index === 0) {
              const text = element.match(/\d+\.\d+[P]/gm);

              const newArr = [];
              newArr.push(element.split(text)[0].toString());
              newArr.push(text.toString());
              return newArr;
            }
            return element;
          });
        });
        step21 = step20.map((el) => {
          return el.flat();
        });
        step22 = step21.map((el) => {
          return el.map((element, index) => {
            if (index === 0) {
              return element;
            }
            return element.replace(/P/g, "");
          });
        });
        step23 = step22.map((el) => {
          return el.map((element, index) => {
            if (index === 0) {
              return element;
            }
            return +element;
          });
        });

        step24 = step23.map((el) => {
          return el.map((element, index) => {
            if (index !== 0 && isNaN(element)) {
              return 1;
            }
            return element;
          });
        });

        step25 = step24.map((el) => {
          if (el.length < 4) {
            el.push(1);
          }
          return el;
        });
        console.log(step25);
        return step25;
      } catch (error) {
        (error.message);
      }
    }
    const billArray = await main();
    // console.log(billArray);
    const size = 8;
    const newBill = await Bill.create({
      name: `${req.file.filename}`,
      status: false,
      img_id: imgUrl.id,
      code: nanoid(size),
    });
    // console.log("newBill", newBill);
    const newBill_Split = await Bill_Split.create({
      bill_parent_id: newBill.id,
      user_id: imgUrl.user_id,
    });

    const allBillsItems = billArray.map((el) => {
      const item = {};
      item.bill_id = newBill.id;
      item.name = el[0];
      item.price = el[1];
      item.number = el[2];
      item.sum = el[3];
      return item;
    });
    const allItems = await Item.bulkCreate(allBillsItems);
    const currentBill = await Bill.findOne({
      where: { id: newBill.id },
      include: { model: Item, where: { bill_id: newBill.id } },
    });
    // console.log("billArray", billArray);
    // console.log("currentBill", currentBill);
    return res.json({ billUrl, currentBill });
  } catch (error) {
    console.log(error);
    return res.send('')
  }
};

module.exports = {
  uploadOneFile,
  upload,
};
