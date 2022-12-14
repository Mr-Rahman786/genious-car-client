import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/Authprovider';

const Checkout = () => {
    const { _id, title, img, price, } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handleplaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstname.value} ${form.lastname.value}`;
        const phone = form.phone.value;
        const massage = form.massage.value;
        const email = user?.email || 'unregister';

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            massage
        }
        // if (phone.length > 10) {
        //     alert('phone number should be 10 carrecter as longer')
        // }
        // else {

        // }
        fetch('https://genious-car-server-pied.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('order placed')
                    form.reset();
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <form onSubmit={handleplaceOrder}>
                <h2 className="text-2xl">{title}</h2>
                <h4 className="text-3xl">Price ${ price}</h4>  
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name="firstname" type="text" placeholder="First Name" className="input input-ghost w-full input-bordered" />
                    <input name="lastname" type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered" />
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full input-bordered" required />
                    <input name="email" type="text" placeholder="Your Email" defaultValue={user?.email} readOnly className="input input-
                    ghost w-full input-bordered" />
                </div>
                <textarea name="massage" className="textarea textarea-bordered h-24 w-full" placeholder="Write your Massage" required></textarea>
                <input className='btn' type="submit" value="Place your order" />
            </form>
        </div>
    );
};

export default Checkout;