import { GraphQLClient, gql } from "graphql-request";

const yelpApiUrl = "https://api.yelp.com/v3/graphql";

const buildBusinessQueryElement = (index, businessId) => {
  return `b${index}: business(id: "${businessId}") {
        name
        id
        rating
        price
        phone
        categories {title}
        location {formatted_address}
    }`;
};

export const getBusinessDetails = async (businessIds) => {
  const graphQLClient = new GraphQLClient(yelpApiUrl, {
    headers: {
      Authorization:
        "Bearer RFsdSSg9x-w8RaXdVkS9sKOnPdiUrFDlpdIbFswAJ5AZemXA4luT9Fq4f-KB2ULJ1ivY3E2sSpYWQSPakBqxypR4HW8ruHX3aJ0eW6jWVmcGEwzoUU2o9tQ42sKMZHYx",
    },
  });

  const query = gql`
        {
        ${businessIds
          .map((businessId) =>
            buildBusinessQueryElement(
              businessIds.indexOf(businessId),
              businessId
            )
          )
          .join(" ")}
        }
  `;

  const data = await graphQLClient.request(query);
  let jsonArr = [];
  for (const keyValue in data) {
    jsonArr.push(data[keyValue]);
  }
  const processedData = {
    businesses: jsonArr,
  };

  return processedData;
};
