import { PdfReader } from "pdfreader";
export function data(pathToPdf) {
  return new Promise((resolve) => {
    new PdfReader().parseFileItems(pathToPdf, (err, item) => {
      if (err) console.error("error:", err);
      else if (!item) console.warn("end of file");
      else if (item.text) resolve(item.text);
    });
  });
}
