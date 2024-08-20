export const numberInputValidate = (
  value: string,
  decimals: number,
  maxValue?: number,
  minValue?: number,
): string | null => {
  if (value === "") return "";
  if (value === ".") value = "0.";
  if (!/^(\d+(\.\d*)?|\d+(\.\d+)?)$/.test(value)) {
    return null;
  }
  while (value.length > 1 && value[0] === "0" && value[1] !== ".") {
    value = value.slice(1);
  }
  if (value.split(".")[1]?.length > decimals) {
    return null;
  }
  if (maxValue && +value > maxValue) {
    value = maxValue.toString();
  }
  if (minValue && +value < minValue) {
    value = minValue.toString();
  }
  return value;
};
