const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESSTOKEN
});

module.exports = async() => {
  const posts = await client.getEntries({
    content_type: "post",
    order: "sys.createdAt"
  });
  return posts.items;
};
