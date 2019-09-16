const formatNumber = (num, displayAmountType) => {
  if (displayAmountType === 'million') {
    return num && num / 10000;
  }
  if (displayAmountType === 'thousand') {
    return num && num / 1000;
  }
  return num;
};

export default formatNumber;
