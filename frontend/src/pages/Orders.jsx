import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Package, TrendingUp, Clock } from 'lucide-react';

export default function Orders() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING');

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions/buyer/${user.id}?status=${filter}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'FAILED': 'bg-red-100 text-red-800',
      'CANCELLED': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track your orders and transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 flex-wrap">
          {['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="text-lg font-bold text-gray-900">{transaction.orderId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="text-lg font-bold text-gray-900">{transaction.items?.length || 0} items</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-lg font-bold text-indigo-600">${transaction.totalAmount}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-semibold">
                      View Details
                    </button>
                  </div>
                </div>

                {transaction.items && transaction.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
                    <ul className="space-y-1">
                      {transaction.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {item.quantity}x Product - ${item.price} each
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && transactions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
