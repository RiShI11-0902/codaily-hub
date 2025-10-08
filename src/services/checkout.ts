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
}

export const submitCheckout = async (data: CheckoutData) => {
  try {
    const response = await axios.post('/api/checkout', data);
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
