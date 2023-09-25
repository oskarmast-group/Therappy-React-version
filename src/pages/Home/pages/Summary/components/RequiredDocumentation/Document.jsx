import React, { useCallback, useMemo, useState } from "react";
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
import useRequiredDocumentation from "state/requiredDocumentation";
import { useDropzone } from "react-dropzone";

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

const DocumentOptionsContainer = styled.div`
    position: absolute;
    top: 24px;
    left: 3px;
    border-radius: 8px;
    background-color: white;
    -webkit-box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.5); 
    box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: flex-start;
    padding: 5px 10px;
`;

const Option = styled.button`
    cursor: pointer;
    background-color: none;
    background: none;
    outline: none;
    border: none;
    text-align: start;
`;

const Document = ({ uuid, name, status, comment }) => {
    const alert = useAlert();
    const [showOptions, setShowOptions] = useState(false);
    const [, requiredDocumentationDispatcher] = useRequiredDocumentation();

    const onDrop = useCallback(
        (acceptedFiles, fileRejections) => {
            if (acceptedFiles.length === 0 && fileRejections.length > 0) {
                alert({
                    type: ALERT_TYPES.INFO,
                    config: {
                        title: "Formato incorrecto",
                        body: (
                            <span>
                                Verifica que el documento que intentas subir sea válido, menor a 200kB y de tipo
                                doc, docx, txt o pdf.
                            </span>
                        ),
                        buttonText: "OK",
                    },
                })
                    .then(() => {})
                    .catch(() => {});
                return;
            }
            const file = acceptedFiles[0];
            requiredDocumentationDispatcher.updateStart({
                doc: file,
                uuid,
            });

            setShowOptions(false);
        },
        [requiredDocumentationDispatcher]
    );

    const { open, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"],
            "application/pdf": [".pdf"],
        },
        maxSize: 200000,
        multiple: false,
    });

    const docURL = useMemo(()=> {
        return `${DOCUMENTS_URL}/therapist-documentation/${localStorage.getItem('userIdentity')}/${uuid}-${name}`;
    }, [uuid, name])

    const deleteStart = () => {
        alert({
            type: ALERT_TYPES.CONFIRM,
            config: {
                title: 'Eliminar documento?',
                body: <span>Esta acción no se puede revertir</span>,
                cancelButtonText: 'Mantener',
                confirmButtonText: 'Eliminar',
            },
        })
            .then(() => {
                requiredDocumentationDispatcher.deleteStart(uuid);
            })
            .catch(() => {});

        setShowOptions(false);
    }

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
            <Menu onClick={()=>setShowOptions(!showOptions)}>
                <img src={DotsMenuSVG} alt="Opciones de archivo" />
            </Menu>
            <a href={docURL} target="_blank" download={true} style={{ paddingBottom: '5px' }} rel="noreferrer">
                <img src={FileSVG} alt="Ícono soltar archivos" />
            </a>
            <Name>{name}</Name>
            {showOptions && <DocumentOptionsContainer>
                <div {...getRootProps()}>
                <input {...getInputProps()}/>
                <Option onClick={open}>
                    Editar
                </Option>
                </div>
                <Option onClick={deleteStart}>
                    Eliminar
                </Option>
            </DocumentOptionsContainer>}
        </Container>
    );
};

export default Document;
