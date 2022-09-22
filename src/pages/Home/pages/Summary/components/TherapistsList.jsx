import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { DARKER_TEXT, GOLDEN, GREEN } from 'resources/constants/colors';
import useCategories from 'state/categories';
import useTherapist from 'state/therapists';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { Link } from 'react-router-dom';
import SearchSVG  from 'resources/img/search.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
`;

const ListContainer = styled.ul`
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
            color: white;
        }
    }
`;

const Intructions = styled.h3`
    margin: 0;
`;

const Description = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: ${DARKER_TEXT};
    margin: 0;
`;

const TherapistsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex: 1;
    min-height: 0;
    overflow: scroll;
    padding-bottom: 20px;
    li {
        margin: 0;
        border: 1px solid ${GREEN};
        border-radius: 20px;

        a {
            padding: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
            color: ${DARKER_TEXT};
            text-decoration: none;
        }

        .image-container {
            width: 66px;
            height: 66px;
            overflow: hidden;
            border-radius: 12px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .information {
            flex: 1;
            min-height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .texts {
                color: ${DARKER_TEXT};
                h4 {
                    font-size: 16px;
                    margin: 0;
                    user-select: none;
                }
            }
        }
    }
`;

const RatingInfoContainer = styled.div`
    display: flex;
    gap: 10px;
    .stars {
        display: flex;
        gap: 5px;
    }
    p {
        margin: 0;
        font-size: 12px;
        color: ${DARKER_TEXT};
        user-select: none;
    }
`;

const Therapist = ({ title, name, lastName, profileImg }) => {
    return (
        <li>
            <Link>
                <div className="image-container">
                    <img src={profileImg ? `${process.env.PUBLIC_URL}/images/${profileImg}` : NoProfileSVG} />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${title} ${name} ${lastName}`}</h4>
                    </div>
                    <RatingInfoContainer>
                        <div className="stars"></div>
                        <p>5.00</p>
                        <p>18 reseñas</p>
                    </RatingInfoContainer>
                </div>
            </Link>
        </li>
    );
};

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

const TherapistsList = () => {
    const [therapists, therapistsDispatcher] = useTherapist();
    const [categories, categoriesDispatcher] = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
        categoriesDispatcher.fetchStart();
        therapistsDispatcher.fetchStart();
    }, []);

    useEffect(() => {
        if (categories.list.length === 0) return;
        setSelectedCategory(categories.list[0]);
    }, [categories.list]);

    return (
        <Container>
            <Intructions>Aún no tienes un terapeuta asignado, encuentra uno:</Intructions>
            <SearchButton to={'/terapeutas'}>
                <img src={SearchSVG} />
            </SearchButton>
            <ListContainer>
                {categories?.list.map((cat) => (
                    <li
                        key={cat.id}
                        className={cat.id === selectedCategory?.id ? 'active' : ''}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat.title}
                    </li>
                ))}
            </ListContainer>
            {selectedCategory !== null && <Description>{selectedCategory.description}</Description>}
            {selectedCategory !== null && (
                <TherapistsContainer>
                    {therapists.list
                        .filter(({ categories }) => categories.includes(selectedCategory.id))
                        .map((ther) => (
                            <Therapist {...ther} />
                        ))}
                </TherapistsContainer>
            )}
        </Container>
    );
};

export default TherapistsList;
