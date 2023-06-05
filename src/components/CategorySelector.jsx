import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCategories from 'state/categories';
import { DARKER_TEXT, GOLDEN } from 'resources/constants/colors';

const Container = styled.ul`
    display: flex;
    list-style: none;
    gap: 10px;
    padding: 0;

    li {
        font-size: 16px;
        text-align: center;
        color: ${DARKER_TEXT};
        margin: 0;
        padding: 2px 10px;
        border: 2px solid ${GOLDEN};
        border-radius: 7px;
        cursor: pointer;
        &.active {
            background-color: ${GOLDEN};
            color: #fbfbfd;
        }
    }
`;

export const CategoryDescription = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: ${DARKER_TEXT};
    margin: 0;
`;


const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
    const [categories, categoriesDispatcher] = useCategories();

    useEffect(() => {
        categoriesDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (categories.list.length === 0) return;
        setSelectedCategory(categories.list[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories.list]);

    return (
        <Container>
            {categories?.list.map((cat) => (
                <li
                    key={cat.id}
                    className={cat.id === selectedCategory?.id ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat)}
                >
                    {cat.title}
                </li>
            ))}
        </Container>
    );
};

export default CategorySelector;
