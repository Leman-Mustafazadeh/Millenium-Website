export const BASE_URL = "https://millenniumtour.redmark.az";
export const endpoints = {
  addlogin: "/Account/Login",
  login: "/Account/get-username",
  users: "/AccountLogin",
  addhero: "/api/Gallery/add-slide",
  delhero: "/api/Gallery/delete-slide/{id}",
  hero: "/api/Gallery/get-slides",
  gallery: "/api/Gallery/get-gallery",
  addGallery: "/api/Gallery/add-image",

  tour:"/api/Tour/get-tours",
  addtour:"/api/Tour/add-tour",


  award:"/api/Gallery/get-sertificates",
  addaward:"/api/Gallery/add-sertificate",


  addteam: "/api/Team/add-employee",
  team: "/api/Team/get-team",
  addlogo: "/api/Gallery/add-logo",
  logo: "/api/Gallery/get-logos",
  
};
