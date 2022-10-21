import React, { useEffect, useState } from 'react';
import { GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchSVG from 'resources/img/search.svg';
import CategorySelector, { CategoryDescription } from 'components/CategorySelector';
import TherapistsList from 'components/TherapistsList';
import useTherapist from 'state/therapists';
import { Container, Intructions } from './styles';

const SearchButton = styled(Link)`
    margin-top: 10px;
    border: 1px solid ${GREEN};
    border-radius: 20px;
    padding: 10px 20px;
    display: flex;
    height: 42px;

    img {
        height: 100%;
        object-fit: cover;
    }
`;

const TherapistSelectionSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [therapists, therapistsDispatcher] = useTherapist();
    
    useEffect(() => {
        therapistsDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Intructions>Aún no tienes un terapeuta asignado, encuentra uno:</Intructions>
            <SearchButton to={'/terapeutas'}>
                <img src={SearchSVG} alt={'Icono Búsqueda'} />
            </SearchButton>
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            {selectedCategory !== null && <CategoryDescription>{selectedCategory.description}</CategoryDescription>}
            {selectedCategory !== null && (
                <TherapistsList
                    therapists={therapists.list.filter(({ categories }) => categories.includes(selectedCategory.id))}
                />
            )}
        </Container>
    );
};

export default TherapistSelectionSection;
