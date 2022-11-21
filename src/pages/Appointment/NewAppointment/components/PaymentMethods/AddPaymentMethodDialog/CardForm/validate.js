import { CardNumberElement } from '@stripe/react-stripe-js';

const validateAndSubmit = async (formData, secret, stripe, elements) => {

    if (!stripe || !elements) {
        throw new Error('');
    }
    
    console.log('elements', formData.name, formData.zip, formData);

    const result = await stripe.confirmCardSetup(
        secret,
        {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: formData.name,
                    address: {
                        postal_code: formData.zip,
                    }
                },
                metadata: {
                    name: formData.name,
                },
            },
        }
    );

    if(result.error) throw new Error(result.error.message);
}

export default validateAndSubmit;