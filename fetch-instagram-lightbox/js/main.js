"use strict"; // to enable strict mode and modern JavaScript functionality

async function fetchInstagramPosts(userName) {
  let url = `https://instagram.com/${userName}/?__a=1`;
  let response = await fetch(url); // fetch and wait the response
  let data = await response.json(); // read response body and wait for parsing the JSON
  let posts = data.graphql.user.edge_owner_to_timeline_media.edges;
  appendPosts(posts);
}

function appendPosts(posts) {
  let htmlTemplate = "";
  for (const post of posts) {
    console.log(post);
    let thumbnail = post.node.thumbnail_src;
    let image = post.node.display_url;
    let url = `https://www.instagram.com/p/${post.node.shortcode}/`

    htmlTemplate += /*html*/ `
        <a href="${image}">
          <img src="${thumbnail}">
        </a>
    `;
  }

  document.querySelector("#lightgallery").innerHTML = htmlTemplate;
  initLightGallery();
}

function initLightGallery() {
  lightGallery(document.getElementById('lightgallery'), {
    fullScreen: false,
    download:false
  });
}

fetchInstagramPosts("cederdorff");

