import { useAlert } from "alert";
import ALERT_TYPES from "alert/types";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PRIMARY_GREEN } from "resources/constants/colors";
import styled from "styled-components";
import FileUploadSVG from "resources/img/icons/file-upload.svg";
import FileDownloadSVG from "resources/img/icons/file-download.svg";
import FileSVG from "resources/img/icons/file.svg";
import useRequiredDocumentation from "state/requiredDocumentation";
import { Ring } from "@uiball/loaders";

const Upload = styled.div`
    border-width: 2px;
    border-radius: 2px;
    border-color: ${PRIMARY_GREEN}33;
    border-style: dashed;

    &.active {
        border-color: ${PRIMARY_GREEN};
    }
`;

const Document = styled.div`
    position: relative;

    .loader {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        svg {
            position: relative;
        }
    }
`;

const Name = styled.p`
    font-size: 12px;
    margin: 0;
    padding: 0 2px;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 0;
`;

const DocumentUpload = ({ documentType }) => {
    const alert = useAlert();
    const [requiredDocumentation, requiredDocumentationDispatcher] = useRequiredDocumentation();

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
            requiredDocumentationDispatcher.uploadStart({
                doc: file,
                uuid: "newdoc",
                documentType,
            });
        },
        [requiredDocumentationDispatcher]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

    return requiredDocumentation?.fetching?.upload?.state &&
        requiredDocumentation?.fetching?.upload?.config?.key === "newdoc" ? (
        <Document>
            <div style={{ paddingBottom: "10px" }}>
                <img src={FileSVG} alt="Ícono archivo cargado" />
            </div>
            <div className="loader">
                <Ring size={12} color={"white"} />
            </div>
            {requiredDocumentation?.fetching?.upload?.config?.name && (
                <Name>{requiredDocumentation?.fetching?.upload?.config?.name}</Name>
            )}
        </Document>
    ) : (
        <Upload
            {...getRootProps({
                className: isDragActive ? "active" : "",
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <img src={FileDownloadSVG} alt="Ícono soltar archivos" />
            ) : (
                <img src={FileUploadSVG} alt="Ícono subir archivos" />
            )}
        </Upload>
    );
};

export default DocumentUpload;
