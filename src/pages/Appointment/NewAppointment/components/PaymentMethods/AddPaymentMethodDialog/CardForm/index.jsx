import React, { useEffect, useState } from 'react';
import CARD_BRANDS from 'resources/constants/cardBrands';
import styled from 'styled-components';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import CardNumber from './CardNumber';
import Expiration from './Expiration';
import CVC from './CVC';
import CardIcon from './CardIcon';
import validateAndSubmit from './validate';
import Button from 'components/Button';
import Input from 'components/Input';
import { Body } from 'components/Text';
import { BasicInput } from 'components/Input/styles';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: center;
    width: 100%;
    background-color: transparent;
`;

const CardBackground = styled.div`
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    grid-gap: 5px;
`;

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d50000;
`;

const CardForm = ({ user, secret, confirmPayment }) => {
    const [brand, setBrand] = useState(CARD_BRANDS.UNKNOWN);
    const [formData, setFormData] = useState({
        name: `${user.name ?? ''}${user.lastName ? ' ' : ''}${user.lastName ?? ''}`,
        zip: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const onChangeCard = (e) => {
        setBrand(e.brand);
    };

    useEffect(() => {
        console.log('formData', formData.name, formData.zip);
    }, [formData]);

    const onChange = (key, value) => {
        const obj = { ...formData };
        obj[key] = value;
        setFormData(obj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await validateAndSubmit(formData, secret, stripe, elements);
            confirmPayment();
        } catch (e) {
            if (e.message !== '') {
                setError(e.message);
                return;
            }
            setError('Error desconocido');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={loading ? () => {} : handleSubmit}>
            <Container>
                <CardBackground>
                    <CardIcon brand={brand} />
                    <Body style={{ fontWeight: 700 }}>Número</Body>
                    <CardNumber onChange={onChangeCard} />
                    <div style={{ height: '15px' }}></div>
                    <Body style={{ fontWeight: 700 }}>Nombre en la tarjeta</Body>
                    <BasicInput
                        value={formData.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        placeholder={'Alonso Pérez'}
                        required={true}
                    />
                    <div style={{ height: '15px' }}></div>
                    <Grid>
                        <Expiration />
                        <CVC />
                        <div>
                            <Body style={{ fontWeight: 700 }}>Código Postal</Body>
                            <BasicInput
                                id={'postal-code'}
                                name={'postal_code'}
                                value={formData.zip}
                                type={'number'}
                                onChange={(e) => onChange('zip', e.target.value)}
                                placeholder={'90000'}
                                required={true}
                            />
                        </div>
                    </Grid>
                </CardBackground>
                <div style={{ height: '15px' }}></div>
                {error && <ErrorText>{error}</ErrorText>}
                <Button type={'submit'} style={{ width: '80%' }}>
                    {loading ? '...' : 'Confirmar'}
                </Button>
            </Container>
        </form>
    );
};

export default CardForm;
