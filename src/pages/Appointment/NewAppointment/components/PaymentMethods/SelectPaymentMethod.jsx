import { Ring } from '@uiball/loaders';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import CardSVG from 'resources/img/card.svg';

const transformMethods = (paymentMethods) => {
    const methods = paymentMethods.map((pm) => ({ value: pm.id, label: `**** **** ${pm.card.last4}` }));
    methods.push({ value: 'new method', label: 'Agregar método de pago' })
    return methods;
};

const Container = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
    border: solid 1px ${PRIMARY_GREEN};
    border-radius: 30px;
`;

const SelectMethod = styled.select`
    flex: 1;
    min-width: 80px;
    border: none;
    outline: none;
    background-color: transparent;
    position: relative;
`;

const SelectPaymentMethod = ({ paymentMethods, selectedMethod, onChangeMethod }) => {
    const [methods, setMethods] = useState(transformMethods(paymentMethods));

    useEffect(() => {
        setMethods(transformMethods(paymentMethods));
    }, [paymentMethods]);

    useEffect(() => {
        if (methods.length === 1) return;
        onChangeMethod(methods[0].value);
    }, [methods]);

    return !!methods && methods.length > 1 && !!selectedMethod ? (
        <Container>
            <img src={CardSVG} alt={'Tarjeta'} />
            <SelectMethod value={selectedMethod} onChange={(e) => onChangeMethod(e.target.value)}>
                {methods.map((method) => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                ))}
            </SelectMethod>
        </Container>
    ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Ring color={PRIMARY_GREEN} size={25} />
        </div>
    );
};

export default SelectPaymentMethod;
