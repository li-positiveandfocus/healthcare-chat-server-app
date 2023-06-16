const sdk = api("@yelp-developers/v1.0#2hsur2ylbank95o");
sdk.auth(
  "Bearer RFsdSSg9x-w8RaXdVkS9sKOnPdiUrFDlpdIbFswAJ5AZemXA4luT9Fq4f-KB2ULJ1ivY3E2sSpYWQSPakBqxypR4HW8ruHX3aJ0eW6jWVmcGEwzoUU2o9tQ42sKMZHYx"
);

export const getBusinessDetail = async (bookmark) => {
  let newBookmark = bookmark.toObject();
  let businessId = bookmark.businessId;
  sdk
    .v3_business_info({ business_id_or_alias: businessId })
    .then(({ data }) => {
      console.log(data);
      newBookmark = { ...newBookmark, business: data };
    })
    .catch((err) => console.error(err));

  return newBookmark;
};
