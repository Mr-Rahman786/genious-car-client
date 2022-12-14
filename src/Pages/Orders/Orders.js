import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/Authprovider';
import OrderMenia from '../OrderMenia/OrderMenia';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrder] = useState([])
    
    
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Are You Sure,you want to cancel this order')
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted Sucessfully')
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrder(remaining)
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id)
                    const approving = orders.find(odr => odr._id === id)
                    approving.status = 'Approved'

                    const newOrders = [approving,...remaining]
                    setOrder(newOrders);
                }
            })
    }

    return (
        <div>
            <h2 className="text-2xl"> you have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Massage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderMenia
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderMenia>)
                        }
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default Orders;