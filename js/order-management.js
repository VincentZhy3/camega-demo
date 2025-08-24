// Order Management with Firebase Firestore
class OrderManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize Firestore if Firebase is available
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            this.db = firebase.firestore();
        }
    }

    // Create new order
    async createOrder(orderData) {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (!user) {
                throw new Error('User not logged in');
            }

            const order = {
                userId: user.uid,
                userEmail: user.email,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                status: 'pending', // pending, confirmed, shipped, delivered, cancelled
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                shippingAddress: orderData.shippingAddress,
                paymentMethod: orderData.paymentMethod,
                orderNumber: this.generateOrderNumber()
            };

            const docRef = await this.db.collection('orders').add(order);
            return {
                success: true,
                orderId: docRef.id,
                orderNumber: order.orderNumber
            };
        } catch (error) {
            console.error('Failed to create order:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get user order history
    async getUserOrders(userId = null) {
        try {
            const user = userId || JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (!user) {
                throw new Error('User not logged in');
            }

            const userIdToQuery = userId || user.uid;
            const snapshot = await this.db
                .collection('orders')
                .where('userId', '==', userIdToQuery)
                .orderBy('createdAt', 'desc')
                .get();

            const orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                orders: orders
            };
        } catch (error) {
            console.error('Failed to get order history:', error);
            return {
                success: false,
                error: error.message,
                orders: []
            };
        }
    }

    // Update order status
    async updateOrderStatus(orderId, newStatus) {
        try {
            await this.db.collection('orders').doc(orderId).update({
                status: newStatus,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return {
                success: true,
                message: 'Order status updated successfully'
            };
        } catch (error) {
            console.error('Failed to update order status:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get order details
    async getOrderDetails(orderId) {
        try {
            const doc = await this.db.collection('orders').doc(orderId).get();
            
            if (doc.exists) {
                return {
                    success: true,
                    order: {
                        id: doc.id,
                        ...doc.data()
                    }
                };
            } else {
                return {
                    success: false,
                    error: 'Order does not exist'
                };
            }
        } catch (error) {
            console.error('Failed to get order details:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Add user browsing history
    async addToHistory(productId, productName, productImage) {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (!user) {
                return { success: false, error: 'User not logged in' };
            }

            const historyItem = {
                userId: user.uid,
                productId: productId,
                productName: productName,
                productImage: productImage,
                viewedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.db.collection('browsing_history').add(historyItem);
            return { success: true };
        } catch (error) {
            console.error('Failed to add browsing history:', error);
            return { success: false, error: error.message };
        }
    }

    // Get user browsing history
    async getBrowsingHistory(limit = 10) {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (!user) {
                return { success: false, error: 'User not logged in', history: [] };
            }

            const snapshot = await this.db
                .collection('browsing_history')
                .where('userId', '==', user.uid)
                .orderBy('viewedAt', 'desc')
                .limit(limit)
                .get();

            const history = [];
            snapshot.forEach(doc => {
                history.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, history: history };
        } catch (error) {
            console.error('Failed to get browsing history:', error);
            return { success: false, error: error.message, history: [] };
        }
    }

    // Generate order number
    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `CMG${timestamp}${random}`;
    }

    // Get order status text description
    getOrderStatusText(status) {
        const statusMap = {
            'pending': 'Pending',
            'confirmed': 'Confirmed',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || status;
    }

    // Format order data for display
    formatOrderForDisplay(order) {
        return {
            ...order,
            statusText: this.getOrderStatusText(order.status),
            createdAt: order.createdAt ? new Date(order.createdAt.toDate()).toLocaleString('en-US') : 'Unknown',
            updatedAt: order.updatedAt ? new Date(order.updatedAt.toDate()).toLocaleString('en-US') : 'Unknown'
        };
    }
}

// Initialize order manager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.orderManager = new OrderManager();
    });
} else {
    window.orderManager = new OrderManager();
} 