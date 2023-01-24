export const formatPhoneNumber = (number: string) => {
  if (number.length === 12) {
    return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
  }
  if (number.length === 11) {
    return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5');
  }
  return null;
};
