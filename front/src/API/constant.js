export const BASE_URL = "https://millenniumtour.redmark.az";
export const endpoints = {
  addlogin: "/Account/Login",
  login: "/Account/get-username",
  register:"/Account/Register",
  // users: "/Account/Login",

  hero: "/api/Gallery/get-slides",//hero area
  addhero:"/api/Gallery/add-slide",
  delhero: "/api/Gallery/delete-slide/{id}",
  delhero:"/api/Gallery/delete-slide/{id}",
puthero:"/api/Gallery/update-slide{id}",




  gallery: "/api/Gallery/get-gallery", //2ci section
  addGallery: "/api/Gallery/add-image",
  delgallery:"/api/Gallery/delete-image/{id}",
  putgallery:"/api/Gallery/update-gallery/{id}",



  tour:"/api/Tour/get-tours",//most popular tour
  addtour:"/api/Tour/add-tour",
  deltour:"/api/Tour/delete-tour/{id}",
  puttour:"/api/Tour/update-tour{id}",



  award:"/api/Gallery/get-sertificates",//award licence
  addaward:"/api/Gallery/add-sertificate",
  delaward:"/api/Gallery/delete-sertificate",
  putaward:"/api/Gallery/update-sertificate",





  addteam: "/api/Team/add-employee",//our team
  team: "/api/Team/get-team",
  delteam:"/api/Team/delete-employee/{id}",
  putteam:"/api/Team/update-employee{id}",



  addlogo: "/api/Gallery/add-logo",//home hissesindeki logo olan section
  logo: "/api/Gallery/get-logos",
  dellogo:"/api/Gallery/delete-logo/{id}",
  putlogo:"/api/Gallery/update-logo{id}",



  
  incoming:"/api/Coming/get-incomings",//incoming
  addincoming:"/api/Coming/add-incoming",
  delincoming:"/api/Coming/delete-incoming/{id}",
  putincoming:"/api/Coming/update-incoming/{id}",


  outgoing:"/api/Coming/get-outgoings",//outgoing
  addoutgoing:"/api/Coming/add-outgoing",
  deloutgoing:"/api/Coming/delete-outgoing/{id}",
  putoutgoing:"/api/Coming/update-outgoing/{id}",



  service:"/api/Service/get-services",//service page
  addservice:"/api/Service/add-services",
  delservice:"/api/Service/delete-services/{id}",
  putservice:"/api/Service/update-services/{id}",



  servicecategory:"",//service in sagindaki category 
  addservicecategory:"/api/Service/add-serviceCategory",
  delservicecategory:"/api/Service/delete-serviceCategory/{id}",
  putservicecategory:"/api/Service/update-serviceCategory/{id}",



activity:"/api/Activity/get-activities",//acticity page
  addactivity:"/api/Activity/add-activity",
  delactivity:"/api/Activity/delete-activity/{id}",
  putactivity:"/api/Activity/update-activity{id}"
};
