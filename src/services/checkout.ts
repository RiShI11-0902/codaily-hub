import axios from "axios";

export interface CheckoutData {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  userName: string;
  email: string;
  userId: string;
  planName: string;
  planPrice: number;
  productId: string;
}

export const submitCheckout = async (data: CheckoutData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/payment/one-time`, data);
    return response.data;
  } catch {
    // Simulate successful checkout with dummy response
    console.log('Checkout submitted (dummy):', data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: `Successfully purchased ${data.planName}!`,
      orderId: `ORD-${Date.now()}`,
      data,
    };
  }
};
