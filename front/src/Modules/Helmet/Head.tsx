import React from "react";
import { Helmet } from "react-helmet";

const Head = ({
  title,
  description,
  image,
  image_alt,
}: {
  title: string;
  description: string;
  image: string;
  image_alt?: string;
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={image_alt} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Head;
