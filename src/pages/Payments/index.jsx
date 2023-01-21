import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import Scrollable from 'containers/Scrollable';
import React, { useEffect } from 'react';
import useUser from 'state/user';
import styled from 'styled-components';
import PaymentMethod from './components/PaymentMethod';

const MethodsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex: 1;
    min-height: 0;
    margin-bottom: 0;
`;

const Payments = () => {
    const [user, userDispatcher] = useUser();

    useEffect(() => {
        userDispatcher.fetchStart();
        userDispatcher.fetchPaymentMethodsStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Métodos de pago'} />
            <Scrollable style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {user.fetching.paymentMethods.state === true ||
                user.fetching.fetch.state === true ? (
                    <Loading />
                ) : (
                    <MethodsContainer>
                        {user.paymentMethods.map((method) => (
                            <PaymentMethod method={method} />
                        ))}
                    </MethodsContainer>
                )}
            </Scrollable>
        </MainContainer>
    );
};

export default Payments;
