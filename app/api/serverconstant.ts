export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const services = {
  auth: baseUrl + "/api/auth",
  user: baseUrl + "/api/user",
  contract: baseUrl + "/api/contract",
  dashboard: baseUrl + "/api/dashboard",
  messages: baseUrl + "/api/messages",
};
