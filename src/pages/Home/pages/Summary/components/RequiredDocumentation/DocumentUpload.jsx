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
`;

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const alert = useAlert();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length === 0 && fileRejections.length > 0) {
      alert({
        type: ALERT_TYPES.INFO,
        config: {
          title: "Formato incorrecto",
          body: (
            <span>
              Verifica que el documento que intentas subir sea válido y de tipo
              doc, docx, txt o pdf.
            </span>
          ),
          buttonText: "OK",
        },
      })
        .then(() => {})
        .catch(() => {});
    }

    setFile(acceptedFiles[0]);
  }, []);

  const startUpload = useCallback(()=>{}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  console.log('file', file);

  return (!!file ? <Document>
     <img src={FileSVG} alt="Ícono archivo cargado" />
  </Document> :
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
