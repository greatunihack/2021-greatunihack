import React from "react";
import { Helmet } from "react-helmet";

interface TitleProps {
  title: string;
}

export default function PageHeaders(props: TitleProps) {
  return (
    <Helmet>
      <title>{`${props.title} | ${process.env.REACT_APP_HACKATHON_NAME}`}</title>
    </Helmet>
  );
}
