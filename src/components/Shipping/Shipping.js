import { text } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import './shipping.css'

const Shipping = () => {
    const {user} = useAuth();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const onSubmit = data => {
      const savedCart = getStoredCart();
      data.order = savedCart;
      fetch('http://localhost:5000/orders',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result =>{
          console.log(result);
          if(result.insertedId){
              alert('order successfull')
              clearTheCart();
              reset();
          };
      })

};
    return (
        <div>
            <form className='shipping-form' onSubmit={handleSubmit(onSubmit)}>
            
            <input defaultValue={user.displayName} {...register("name")} />
            <input defaultValue={user.email} {...register("email", { required: true })} />
            <input defaultValue={text} {...register("text", { required: true })} placeholder='location' />
            <input defaultValue={Number} {...register("number", { required: true })} placeholder='mobile' />

            {errors.email && <span className='error'>This field is required</span>}
            
            <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;