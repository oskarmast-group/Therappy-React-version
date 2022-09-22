import CategorySelector, { CategoryDescription } from 'components/CategorySelector';
import TherapistsList from 'components/TherapistsList';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { GREEN } from 'resources/constants/colors';
import useTherapist from 'state/therapists';
import styled from 'styled-components';
import SearchSVG from 'resources/img/search.svg';
import { compareStrings } from 'utils';

const SearchInput = styled.div`
    margin-top: 10px;
    border: 1px solid ${GREEN};
    border-radius: 20px;
    padding: 10px 20px;
    display: flex;
    height: 42px;
    gap: 10px;
    img {
        height: 100%;
        object-fit: cover;
    }

    input {
        height: 100%;
        flex: 1;
        outline: none;
        border: none;
    }
`;

const Therapists = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [therapists, therapistsDispatcher] = useTherapist();
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        therapistsDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(selectedCategory == null) return;
        const filteredCat = therapists.list.filter(({ categories }) => categories.includes(selectedCategory.id));
        const filteredSearch =
            search.length > 0
                ? filteredCat.filter(
                      ({ name, lastName }) => compareStrings(name ?? '', search) || compareStrings(lastName ?? '', search)
                  )
                : filteredCat;
        setList(filteredSearch);
    }, [therapists.list, selectedCategory, search]);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Terapeutas'} />
            <SearchInput>
                <img src={SearchSVG} alt={'Icono Búsqueda'} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} />
            </SearchInput>
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            {selectedCategory !== null && <CategoryDescription>{selectedCategory.description}</CategoryDescription>}
            {selectedCategory !== null && <TherapistsList therapists={list} />}
        </MainContainer>
    );
};

export default Therapists;
