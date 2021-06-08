class PhotoGallery {
  constructor() {
    this.API_KEY = "563492ad6f9170000100000146205173967d455cb72fd4a1a285b6b4";
    this.galleryDIv = document.querySelector(".gallery");
    this.searchForm = document.querySelector(".header form");
    this.loadMore = document.querySelector(".load-more");
    this.logo = document.querySelector(".logo");
    this.pageIndex = 1;
    this.searchValueGlobal = "";
    this.eventHandle();
  }
  eventHandle() {
    document.addEventListener("DOMContentLoaded", () => {
      this.getImg(2);
    });
    this.searchForm.addEventListener("submit", (e) => {
      this.pageIndex = 1;
      this.getSearchedImages(e);
    });
    this.loadMore.addEventListener("click", (e) => {
      this.loadMoreImages(e);
    });
    this.logo.addEventListener("click", () => {
      this.pageIndex = 2;
      this.galleryDIv.innerHTML = "";
      this.getImg(this.pageIndex);
    });
  }
  async getImg(index) {
    this.loadMore.setAttribute("data-img", "curated");
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
    // console.log(data);
  }
  async fetchImages(baseURL) {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.API_KEY,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
  GenerateHTML(photos) {
    photos.forEach((photo) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
      <a href='${photo.src.original}'target="_blank" >
        <img src="${photo.src.medium}" >
        <h3>${photo.photographer}</h3>
        <p>
        <a href="${photo.url}"><i  class="fas fa-download"> </i></a>
        </p>
    
      </a>
      `;
      this.galleryDIv.appendChild(item);
    });
  }
  async getSearchedImages(e) {
    this.loadMore.setAttribute("data-img", "search");
    e.preventDefault();
    this.galleryDIv.innerHTML = "";
    const searchValue = e.target.querySelector("input").value;
    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
    e.target.reset();
  }
  async getMoreSearchedImages(index) {
    // console.log(searchValue)
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`;
    const data = await this.fetchImages(baseURL);
    // console.log(data);
    this.GenerateHTML(data.photos);
  }
  loadMoreImages(e) {
    let index = ++this.pageIndex;
    const loadMoreData = e.target.getAttribute("data-img");
    if (loadMoreData === "curated") {
      // load next page for curated]
      this.getImg(index);
    } else {
      // load next page for search
      this.getMoreSearchedImages(index);
    }
  }
}

const gallery = new PhotoGallery();

// *********************
// This Code is for only the floating card in right bottom corner
// **********************

const touchButton = document.querySelector(".float-text");
const card = document.querySelector(".float-card-info");
const close = document.querySelector(".gg-close-r");

touchButton.addEventListener("click", moveCard);
close.addEventListener("click", moveCard);

function moveCard() {
  card.classList.toggle("active");
}
