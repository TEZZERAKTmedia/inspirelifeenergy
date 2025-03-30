import React , { createContext, useContext} from 'react';
import {registerApi} from '../../config/axios';

const CheckoutContext = createContext();

export const CheckoutProvider = ({children}) => {

    const createCheckoutSession = async (checkoutType, data) => {
        try {
            let response;
            switch (checkoutType) {
                case 'product':
                    response = await registerApi.post('/stripe-checkout/checkout/product', data);
                    break;
                case 'class': 
                    response = await registerApi.post('/stripe-checkout/checkout/class', data);
                    break;
                case 'subscription':
                    response = await registerApi.post('/stripe-checkout/checkout/subsscription', data);
                    break;
                    default:
                        throw new Error('Invalid checkout type');

            };
            return response.data;
        } catch (error) {
            console.error(`Error creating ${checkoutType} checkout sesison:`, error);
            throw error;

        }
    };

    return (
        <CheckoutContext.Provider value={{createCheckoutSession}} >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);

