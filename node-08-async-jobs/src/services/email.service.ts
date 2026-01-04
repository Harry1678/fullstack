export async function sendEmail(to: string, subject: string) {
  if (Math.random() < 0.5) {
    throw new Error("Random email failure");
  }

  await new Promise((res) => setTimeout(res, 1000));
  console.log(`[email] Sent to ${to}: ${subject}`);
}
