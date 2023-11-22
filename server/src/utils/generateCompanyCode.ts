export function generateCompanyCode() {
  let string = '';

  while (string.length < 9) {
    const num = Math.floor(Math.random() * 9) + 1;
    if (!string.includes(num.toString())) {
      string += num.toString();
    }
  }

  return string;
}
