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
        "Bearer yNg5YLB7iLiP63KPBaCv6SZ8M1mAwsCqXDSruWSrVlYz3CCJLQz47mVkHW1HVm6FJHnt788c0LBClbAEOxgM941QTKY8MgSvPtFI7_IEtaq3ETvbdLTZPylMAxyWY3Yx",
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
