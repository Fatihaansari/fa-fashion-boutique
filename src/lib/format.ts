/** Format a PKR amount, e.g. 3290 -> "Rs 3,290". */
export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}
