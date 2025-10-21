import { useContext, useState } from 'react';
import './CartSummary.css'
import { AppContext } from '../../context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import { createOrder, deleteOrder } from '../../service/OrderService';
import toast from 'react-hot-toast';
import { createRazorpayOrder } from '../../service/PaymentService';
import { AppConstants } from '../../utils/constants';

const CartSummary = ({ customerName, mobileNumber, setCustomerName, setMobileNumber }) => {

    const { cartItems } = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = totalAmount * 0.01;
    const grandTotal = totalAmount + tax;

    /**
     * Dynamically injects the Razorpay checkout script into the document.
     *
     * Appends a <script> element with src "https://checkout.razorpay.com/v1/checkout.js" to document.body.
     * Returns a Promise that resolves to true when the script's load event fires, or resolves to false
     * when the script's error event fires. The Promise does not reject.
     *
     * Note: This function must be executed in a browser environment where `document` is available.
     *
     * @returns {Promise<boolean>} Resolves to true if the script loaded successfully, or false on load error.
     */
    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        })
    }

    const deleteOrderOnFailure = async (orderId) => {
        try {
            await deleteOrder(orderId);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const completePayment = async (paymentMode) => {
        if (!customerName || !mobileNumber) {
            toast.error("Please enter customer details");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }
        const orderData = {
            customerName, // it is same as customerName: customerName
            phoneNumber: mobileNumber,
            cartItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMode: paymentMode.toUpperCase()
        }
        setIsProcessing(true);
        try {
            const response = await createOrder(orderData);
            const savedData = response.data;
            if (response.status === 201 && paymentMode === 'cash') {
                toast.success("Cash order placed successfully");
                setOrderDetails(savedData);
            } else if (response.status === 201 && paymentMode === 'upi') {
                const razorpayLoaded = await loadRazorpayScript();
                if (!razorpayLoaded) {
                    toast.error("Unable to load the razorpay");
                    await deleteOrderOnFailure(savedData.orderId);
                    return;
                }
                // create the order in razorpay
                const razorpayResponse = await createRazorpayOrder({ amount: grandTotal, currency: "INR" });
                const options = {
                    key: AppConstants.RAZORPAY_KEY_ID,
                    amount: razorpayResponse.data.amount,
                    currency: razorpayResponse.data.currency,
                    order_id: razorpayResponse.data.id,
                    name: "My Retail Shop",
                    description: "Order Payment",
                    handler: async function (response) {
                        // TO DO verify the payment
                    },
                    prefill: {
                        name: customerName,
                        contact: mobileNumber
                    },
                    theme: {
                        color: "#3399cc"
                    },
                    modal: {
                        onDismiss: async () => {
                            await deleteOrderOnFailure(savedData.orderId);
                            toast.error("Payment cancelled");
                        }
                    }
                };
                const razorpay = new window.Razorpay(options);
                razorpay.on("payment.failed", async function (response) {
                    await deleteOrderOnFailure(savedData.orderId);
                    toast.error("Payment failed");
                    console.error(response.error);
                });
                razorpay.open();
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Item: </span>
                    <span className="text-light">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax (1%): </span>
                    <span className="text-light">₹{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <span className="text-light">Total: </span>
                    <span className="text-light">₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                <button className="btn btn-success flex-grow-1">Cash</button>
                <button className="btn btn-primary flex-grow-1">UPI</button>
            </div>
            <div className="d-flex gap-3 mt-3">
                <button className="btn btn-warning flex-grow-1">Place order</button>
            </div>

            <ReceiptPopup />
        </div >
    )
}

export default CartSummary;