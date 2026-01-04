export async function fetchWeather() {
  
  if (Math.random() < 0.3) {
    throw new Error("Weather API down");
  }

  await new Promise((res) => setTimeout(res, 500));

  return {
    temperature: Math.floor(Math.random() * 40),
    fetchedAt: new Date().toISOString()
  };
}
