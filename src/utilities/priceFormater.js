const formater = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EGP",
});

export function priceFormatter(price) {
  let str = formater.format(price);
  return str.substring(3) + "\t" + str.substring(0, 3);
}
