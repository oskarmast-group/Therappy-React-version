import React, { useMemo } from "react";
import styled from "styled-components";
import FileSVG from "resources/img/icons/file.svg";
import DocumentPendingSVG from "resources/img/icons/document_pending.svg";
import DocumentRejectedSVG from "resources/img/icons/document_rejected.svg";
import DocumentVerifiedSVG from "resources/img/icons/document_verified.svg";
import DotsMenuSVG from "resources/img/icons/dots-menu.svg";
import { DocumentationStatus } from "resources/constants/config";
import { IconButton } from "components/Button";
import { useAlert } from "alert";
import ALERT_TYPES from "alert/types";
import { DOCUMENTS_URL } from "resources/constants/urls";

const StatusIcon = {
    [DocumentationStatus.VERIFIED]: DocumentVerifiedSVG,
    [DocumentationStatus.REJECTED]: DocumentRejectedSVG,
    [DocumentationStatus.PENDING]: DocumentPendingSVG,
};

const StatusTitle = {
    [DocumentationStatus.VERIFIED]: "Documento aprobado",
    [DocumentationStatus.REJECTED]: "Problemas con el documento",
    [DocumentationStatus.PENDING]: "Revisión pendiente",
};

const StatusBody = {
    [DocumentationStatus.VERIFIED]: "Este documento fue revisado y aprobado por el equipo de administración, cuando todos tus documentos sean abrobados podrás continuar con el proceso.",
    [DocumentationStatus.REJECTED]: "Después de una revisión por el equipo de administración, encontramos problemas con tu documento.",
    [DocumentationStatus.PENDING]: "El documento se subió con exito y está en espera de revisión por el equipo de administración.",
};

const Container = styled.div`
    position: relative;
`;

const Name = styled.p`
    font-size: 12px;
    margin: 0;
    padding: 0 5px;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 0;
`;

const Status = styled(IconButton)`
    position: absolute;
    right: 0;
    top: 0;
    background-color: transparent;
    padding: 0;
    img {
        width: 20px;
        height: 20px;
    }
    
`;

const Menu = styled(IconButton)`
    position: absolute;
    left: -3px;
    top: 0;
    background-color: transparent;
    padding: 5px;
    img {
        width: 15px;
        height: 15px;
    }
`;

const Document = ({ uuid, name, status, comment }) => {
    const alert = useAlert();

    const docURL = useMemo(()=> {
        return `${DOCUMENTS_URL}/therapist-documentation/${localStorage.getItem('userIdentity')}/${uuid}-${name}`;
    }, [uuid, name])

    return (
        <Container>
            <Status onClick={() => {
            alert({
              type: ALERT_TYPES.INFO,
              config: {
                title: StatusTitle[status],
                body: (
                  <span>
                    {StatusBody[status]} <br />
                    <br />
                    {comment ?? ''}
                  </span>
                ),
                buttonText: "OK",
              },
            })
              .then(() => {})
              .catch(() => {});
          }}>
                <img src={StatusIcon[status]} alt="Ícono soltar archivos" />
            </Status>
            <Menu onClick={()=>console.log('open')}>
                <img src={DotsMenuSVG} alt="Opciones de archivo" />
            </Menu>
            <a href={docURL} target="_blank" download={true} style={{ paddingBottom: '5px' }}>
                <img src={FileSVG} alt="Ícono soltar archivos" />
            </a>
            <Name>{name}</Name>
        </Container>
    );
};

export default Document;
