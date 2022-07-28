import { gql, useQuery } from "@apollo/client";
import React from "react";

const QUERY_POSTS = gql`
  query GetPosts {
    projecten {
      edges {
        node {
          id
          title
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          projectParameters {
            fieldGroupName
            projectShortDescription
            projectUrl
            projectColor
          }
        }
      }
    }
  }
`;

export default function Posts() {
  const { data, loading, error } = useQuery(QUERY_POSTS);
  if (error) return <p>Error! {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <ul className="list-none">
      {data.projecten.edges.map(({ node }) => (
        <li key={node.id}>
          <div className="font-semibold">
            Titel: {node.title}
            <br />
            Inhoud: {node.projectParameters.projectShortDescription}
            <br />
            <img src={node.featuredImage.node.mediaItemUrl} width="150" />
          </div>
        </li>
      ))}
    </ul>
  );
}
