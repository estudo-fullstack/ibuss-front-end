export function validateCPF(cpf: string) {
  const cleanCPF = cpf.replace(/\D/g, ""); // Remove pontos e traços

  if (cleanCPF.length !== 11 || !!cleanCPF.match(/(\d)\1{10}/)) return false;

  const digits = cleanCPF.split("").map((el) => +el);
  const rest = (count: number) =>
    ((digits
      .slice(0, count - 12)
      .reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;

  return rest(10) === digits[9] && rest(11) === digits[10];
}
