import Loading from "components/Loading";
import React from "react";
import { useEffect } from "react";
import useRequiredDocumentation from "state/requiredDocumentation";
import { Intructions } from "../styles";
import { Body } from "components/Text";
import DocumentationList from "./DocumentationList";

const RequiredDocumentation = () => {
  const [requiredDocumentation, requiredDocumentationDispatcher] =
    useRequiredDocumentation();

  useEffect(() => {
    requiredDocumentationDispatcher.fetchStart();
  }, []);

  return requiredDocumentation.fetching.fetch.state ? (
    <Loading />
  ) : (
    <>
      <Intructions>Completa tu registro</Intructions>
      <Body>Envía la documentación que se solicita para comenzar a utilizar Terappy.</Body>
      {requiredDocumentation.list.map((doc, i) => (
        <DocumentationList key={doc.id} requiredDocument={doc} isInitiallyExpanded={i===0} />
      ))}
    </>
  );
};

export default RequiredDocumentation;
