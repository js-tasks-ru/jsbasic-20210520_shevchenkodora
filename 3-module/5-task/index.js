function getMinMax(str) {
  const arr = str.split(/,| /).filter(item => isFinite(item) === true);
  const min = Math.min.apply(null, arr);
  const max = Math.max.apply(null, arr);
  return {"min": min, "max": max};
}
