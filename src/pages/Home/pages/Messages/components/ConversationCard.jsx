import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import styled from 'styled-components';

const Container = styled.li`
    margin: 0;
    border-bottom: 1px solid ${GREEN};

    a {
        padding: 10px;
        display: flex;
        gap: 10px;
        align-items: flex-start;
        color: ${DARKER_TEXT};
        text-decoration: none;
        margin-bottom: 20px;
    }

    .image-container {
        width: 55px;
        height: 55px;
        overflow: hidden;
        border-radius: 10px;
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
                margin-bottom: 5px;
            }
            p {
                font-weight: 600;
                font-size: 14px;
                margin: 0;

                &.enphasis {
                    font-style: oblique;
                    font-weight: 500;
                }
            }
        }
    }
`;

const ConversationCard = ({conversation}) => {

    const user = useMemo(()=> conversation.users ? conversation.users[0] : null, [conversation]);

    return (
        <Container>
            <Link to={`/conversacion/${conversation.uuid}`}>
                <div className="image-container">
                    <img
                        src={
                            user?.profileImg
                                ? `${IMAGES_URL}${user.profileImg}`
                                : NoProfileSVG
                        }
                        alt={`perfil de ${user.name} ${user.lastName}`}
                    />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${user.title ?? ''} ${user.name} ${user.lastName}`}</h4>
                        <p className={conversation.lastMessage ? '' : 'enphasis'}>{conversation.lastMessage ? conversation.lastMessage : 'Envía tu primer mensaje'}</p>
                    </div>
                </div>
            </Link>
        </Container>
    );
}

export default ConversationCard;
