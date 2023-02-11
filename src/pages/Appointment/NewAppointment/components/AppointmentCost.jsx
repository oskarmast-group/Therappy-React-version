import { Ring } from '@uiball/loaders';
import { Body, SectionTitle } from 'components/Text';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import { formatMoney } from 'utils/text';

const AppointmentCost = ({ loading, pricing }) => {
    return (
        <>
            <SectionTitle>Costo</SectionTitle>
            {loading && <Ring color={PRIMARY_GREEN} size={22} />}
            {!loading &&
                pricing?.parts &&
                Array.isArray(pricing.parts) &&
                pricing.parts.map((part, i) => (
                    <Body key={i}>
                        {part.name}: {formatMoney(part.amount)}
                    </Body>
                ))}
            {!loading && typeof pricing?.total === 'number' && (
                <Body style={{ fontWeight: '700' }}>
                    Total: {formatMoney(pricing.total)}
                </Body>
            )}
        </>
    );
};

export default AppointmentCost;
