// Configured at build time via Vite env vars (see frontend/.env.example)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1.0";

export const AppConstants = {
    RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID || "your_key_id"
};
