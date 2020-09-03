import React from "react";
import { Timeline } from "antd";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_COMMITS_IN_BRANCH = gql`
  {
    repository(name: "todoTs", owner: "dimapanasiuk") {
      ref(qualifiedName: "classComponent") {
        target {
          ... on Commit {
            id
            history(first: 100) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  messageHeadline
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ICheckCommit {
  title: string;
}

const CheckCommits: React.FC<ICheckCommit> = ({ title }: ICheckCommit) => {
  const commits = useQuery(GET_ALL_COMMITS_IN_BRANCH);

  if (commits.loading) return <p>Loading...</p>;
  if (commits.error) return <p>Error :(</p>;

  const commitsData = commits.data.repository.ref.target.history.edges;

  return (
    <>
      <h1 style={{ margin: "20px 0 20px " }}>{title}</h1>
      <Timeline>
        {commitsData.map((item, i) => (
          <Timeline.Item key={i}>{item.node.messageHeadline}</Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
export default CheckCommits;
