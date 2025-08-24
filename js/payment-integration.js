// Payment Integration Module for Camega Health
class PaymentManager {
    constructor() {
        this.supportedMethods = {
            credit_card: {
                name: 'Credit/Debit Card',
                icon: '💳',
                providers: ['stripe', 'square'],
                enabled: true
            },
            paypal: {
                name: 'PayPal',
                icon: '📱',
                providers: ['paypal'],
                enabled: true
            },
            apple_pay: {
                name: 'Apple Pay',
                icon: '🍎',
                providers: ['stripe', 'square'],
                enabled: true
            },
            google_pay: {
                name: 'Google Pay',
                icon: '🤖',
                providers: ['stripe', 'square'],
                enabled: true
            },
            interac: {
                name: 'Interac e-Transfer',
                icon: '🏦',
                providers: ['stripe'],
                enabled: true
            },
            klarna: {
                name: 'Klarna',
                icon: '⏰',
                providers: ['klarna'],
                enabled: false // Future integration
            },
            afterpay: {
                name: 'Afterpay',
                icon: '⏰',
                providers: ['afterpay'],
                enabled: false // Future integration
            }
        };
        
        this.init();
    }

    init() {
        // Initialize payment providers
        this.initStripe();
        this.initPayPal();
    }

    // Initialize Stripe payment processor
    initStripe() {
        if (typeof Stripe !== 'undefined') {
            this.stripe = Stripe('your_publishable_key'); // Replace with actual key
            this.elements = this.stripe.elements();
        }
    }

    // Initialize PayPal
    initPayPal() {
        if (typeof paypal !== 'undefined') {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.currentAmount
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        this.handlePaymentSuccess(details);
                    });
                }
            }).render('#paypal-button-container');
        }
    }

    // Process payment with selected method
    async processPayment(paymentMethod, orderData) {
        try {
            this.currentAmount = orderData.totalAmount;
            
            switch (paymentMethod) {
                case 'credit_card':
                    return await this.processCreditCardPayment(orderData);
                case 'paypal':
                    return await this.processPayPalPayment(orderData);
                case 'apple_pay':
                    return await this.processApplePayPayment(orderData);
                case 'google_pay':
                    return await this.processGooglePayPayment(orderData);
                case 'interac':
                    return await this.processInteracPayment(orderData);
                default:
                    throw new Error('Unsupported payment method');
            }
        } catch (error) {
            console.error('Payment processing failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Process credit card payment via Stripe
    async processCreditCardPayment(orderData) {
        try {
            const { paymentMethod, error } = await this.stripe.createPaymentMethod({
                type: 'card',
                card: this.cardElement,
                billing_details: {
                    name: orderData.customerName,
                    email: orderData.customerEmail
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            const { paymentIntent, error: confirmError } = await this.stripe.confirmCardPayment(
                orderData.clientSecret,
                {
                    payment_method: paymentMethod.id
                }
            );

            if (confirmError) {
                throw new Error(confirmError.message);
            }

            return {
                success: true,
                transactionId: paymentIntent.id,
                paymentMethod: 'credit_card',
                amount: orderData.totalAmount
            };
        } catch (error) {
            throw error;
        }
    }

    // Process PayPal payment
    async processPayPalPayment(orderData) {
        return new Promise((resolve, reject) => {
            // PayPal processing logic
            // This would be handled by PayPal's SDK
            resolve({
                success: true,
                transactionId: 'paypal_' + Date.now(),
                paymentMethod: 'paypal',
                amount: orderData.totalAmount
            });
        });
    }

    // Process Apple Pay payment
    async processApplePayPayment(orderData) {
        try {
            const paymentRequest = {
                country: 'CA',
                currency: 'cad',
                total: {
                    label: 'Camega Health Order',
                    amount: Math.round(orderData.totalAmount * 100) // Convert to cents
                },
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                merchantCapabilities: ['supports3DS']
            };

            const session = new ApplePaySession(3, paymentRequest);
            
            session.onvalidatemerchant = (event) => {
                // Validate merchant with your server
                session.completeMerchantValidation({});
            };

            session.onpaymentauthorized = (event) => {
                // Process payment
                session.completePayment(ApplePaySession.STATUS_SUCCESS);
            };

            session.begin();
        } catch (error) {
            throw error;
        }
    }

    // Process Google Pay payment
    async processGooglePayPayment(orderData) {
        try {
            const paymentDataRequest = {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [{
                    type: 'CARD',
                    parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX']
                    }
                }],
                merchantInfo: {
                    merchantId: 'your_merchant_id',
                    merchantName: 'Camega Health'
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPrice: orderData.totalAmount.toString(),
                    currencyCode: 'CAD',
                    countryCode: 'CA'
                }
            };

            const paymentsClient = new google.payments.api.PaymentsClient({
                environment: 'TEST' // Change to 'PRODUCTION' for live
            });

            const paymentDataRequest = paymentsClient.createPaymentDataRequest(paymentDataRequest);
            const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);

            return {
                success: true,
                transactionId: 'googlepay_' + Date.now(),
                paymentMethod: 'google_pay',
                amount: orderData.totalAmount
            };
        } catch (error) {
            throw error;
        }
    }

    // Process Interac e-Transfer
    async processInteracPayment(orderData) {
        try {
            // Interac e-Transfer processing logic
            // This would integrate with Interac's API
            return {
                success: true,
                transactionId: 'interac_' + Date.now(),
                paymentMethod: 'interac',
                amount: orderData.totalAmount,
                transferUrl: 'https://interac.ca/transfer/' + Date.now()
            };
        } catch (error) {
            throw error;
        }
    }

    // Handle successful payment
    handlePaymentSuccess(paymentDetails) {
        console.log('Payment successful:', paymentDetails);
        
        // Update order status
        if (window.orderManager) {
            window.orderManager.updateOrderStatus(
                this.currentOrderId, 
                'confirmed'
            );
        }

        // Show success message
        this.showPaymentSuccess(paymentDetails);
    }

    // Show payment success message
    showPaymentSuccess(paymentDetails) {
        const successMessage = `
            <div class="result-message result-success">
                <h3>Payment Successful!</h3>
                <p>Transaction ID: ${paymentDetails.transactionId || 'N/A'}</p>
                <p>Amount: CAD $${paymentDetails.amount}</p>
                <p>Payment Method: ${paymentDetails.paymentMethod}</p>
                <p>Your order has been confirmed and will be processed shortly.</p>
            </div>
        `;
        
        // Display success message
        const resultContainer = document.getElementById('payment-result');
        if (resultContainer) {
            resultContainer.innerHTML = successMessage;
        }
    }

    // Get available payment methods
    getAvailablePaymentMethods() {
        return Object.entries(this.supportedMethods)
            .filter(([key, method]) => method.enabled)
            .map(([key, method]) => ({
                id: key,
                ...method
            }));
    }

    // Validate payment method
    validatePaymentMethod(methodId) {
        return this.supportedMethods[methodId] && this.supportedMethods[methodId].enabled;
    }

    // Get payment method details
    getPaymentMethodDetails(methodId) {
        return this.supportedMethods[methodId] || null;
    }
}

// Initialize payment manager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.paymentManager = new PaymentManager();
    });
} else {
    window.paymentManager = new PaymentManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentManager;
}
