export const makeRecord = (w: number, l: number, t: number) => {
  let record = w.toString() + "-" + l.toString();
  if (t > 0) record += "-" + t.toString();
  return record;
};

export const avRating = (of: number, df: number) => {
  return (of + df) / 2;
};
