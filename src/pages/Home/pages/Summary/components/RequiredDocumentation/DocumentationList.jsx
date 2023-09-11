import React, { useMemo, useState } from "react";
import { useCollapse } from "react-collapsed";
import styled from "styled-components";
import { DARKER_TEXT, DARK_TEXT } from "../../../../../../resources/constants/colors";
import { Body } from "components/Text";
import ArrowSVG from "resources/img/icons/arrow-right-green.svg";
import DocumentUpload from "./DocumentUpload";
import useUser from "state/user";
import Document from "./Document";

const Container = styled.div`
    margin-bottom: 5px;
`;

const Header = styled.button`
    outline: none;
    border: none;
    background-color: transparent;
    display: flex;
    padding: 5px 0;
    width: 100%;
    border-bottom: solid 1px ${DARKER_TEXT}55;
    margin-bottom: 5px;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    h4 {
        margin: 0;
        color: ${DARK_TEXT};
    }
`;

const DocumentsContainer = styled.div`
    display: flex;
    gap: 15px;
    min-height: 100px;
    height: 100px;

    & > div {
        width: 80px;
        display: flex;
        height: 100%;

        align-items: center;
        justify-content: center;
    }
`;

const DocumentationDescription = styled(Body)`
    font-size: 12px;
    margin-bottom: 10px;
`;

const DocumentationList = ({ requiredDocument, isInitiallyExpanded = true }) => {
    const [isExpanded, setExpanded] = useState(isInitiallyExpanded);
    const { getCollapseProps } = useCollapse({ isExpanded: isExpanded });
    const [user] = useUser();

    const documents = useMemo(() => {
        if (
            !user.current.extraData?.documentation ||
            !Array.isArray(user.current.extraData?.documentation)
        )
            return [];

        return user.current.extraData.documentation.filter(
            ({ documentType }) => documentType === requiredDocument.documentType
        );
    }, [user.current.extraData, requiredDocument]);

    return (
        <Container>
            <Header onClick={() => setExpanded(!isExpanded)}>
                <h4>{requiredDocument.title}</h4>
                <img
                    src={ArrowSVG}
                    alt={"Indicador de contenido expansible"}
                    style={{
                        width: "15px",
                        height: "auto",
                        transform: isExpanded ? "rotate(270deg)" : "rotate(90deg)",
                        transitionDuration: "0.2s",
                    }}
                />
            </Header>
            <div {...getCollapseProps({})}>
                <div>
                    <DocumentationDescription>
                        {requiredDocument.description}
                    </DocumentationDescription>
                    <DocumentsContainer>
                        {documents &&
                            documents.map(({ uuid, name, status, comment }) => <Document key={uuid} uuid={uuid} name={name} status={status} comment={comment} />)}
                        <DocumentUpload documentType={requiredDocument.documentType} />
                    </DocumentsContainer>
                </div>
            </div>
        </Container>
    );
};

export default DocumentationList;
