import currencyFormatter from "currency-formatter";

export const priceFormatter = (price) => {
  const newPrice = currencyFormatter.format(price, {
    locale: "id",
  });
  return newPrice;
};
