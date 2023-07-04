export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});

export const UnitFormatter = new Intl.NumberFormat('en-US', {
  style: "unit",
  unit: "kilogram",
  notation: 'compact',
  unitDisplay: "short",
});
