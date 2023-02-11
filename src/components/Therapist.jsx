import React from 'react';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from 'resources/constants/urls';
import RatingStars from './RatingStars';

const Container = styled.li`
    list-style: none;
    margin: 0;
    border: 1px solid ${GREEN};
    border-radius: 20px;

    .content {
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
`;

const RenderLink = ({ shouldRender, id, children }) => {
    return shouldRender ? <Link className='content' to={`/terapeutas/${id}`}>{children}</Link> : <div className='content'>{children}</div> 
}

const Therapist = ({ id, title, name, lastName, profileImg, reviewAvg, reviewsCount, clickable=true }) => {
    
    return (
        <Container>
            <RenderLink id={id} shouldRender={clickable} >
                <div className="image-container">
                    <img src={profileImg ? `${IMAGES_URL}${profileImg}` : NoProfileSVG} alt={`perfil de ${name} ${lastName}`} />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${title} ${name} ${lastName}`}</h4>
                    </div>
                    <RatingStars reviewsCount={reviewsCount} reviewAvg={reviewAvg}/>
                </div>
            </RenderLink>
        </Container>
    );
};

export default Therapist;
