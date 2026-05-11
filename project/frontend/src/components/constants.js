export const isTrue = "true";
export const isFalse = "false";
export const active = "active";
export const inactive = "inactive";

export const searchkeys = [
  { name: "Application Reference", value: "code" },
  { name: "National Id", value: "nid" },
  { name: "Telephone", value: "telephone" },
];

export const applicationTypes = [
  { name: "Banking License", value: "bankinglicense" },
  { name: "Payment License", value: "paymentlicense" },
  { name: "Foreigh Exchange", value: "fxlicense" },
];

export const genders = [
  { name: "Gabo/Male", value: "male" },
  { name: "Gore/Female", value: "female" },
];

const containsOnlyNumbers = (str) => {
  return /^\d+$/.test(str);
};

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  //  alert("You have entered an invalid email address!");
  return false;
};

const makeItAnumber = (val) => {
  let remeChar = val?.replace(/[^0-9.]/g, "");
  return Number(remeChar?.replace(/\./g, ""));
};

const objectIsEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

const ONE = 1;
const ZERO = 0;


export default {
  containsOnlyNumbers,
  validateEmail,
  makeItAnumber,
  objectIsEmpty
};
