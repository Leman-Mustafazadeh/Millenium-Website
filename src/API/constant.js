export const BASE_URL = "https://api.millenniumtour.az";
export const endpoints = {
  addlogin: "/api/Account/Login",
  login: "/api/Account/get-username",
  register: "/api/Account/Register",
  // users: "/Account/Login",

  hero: "/api/Gallery/get-slides", //hero area
  addhero: "/api/Gallery/add-slide",
  delhero: "/api/Gallery/delete-slide",
  puthero: "/api/Gallery/update-slide",

  gallery: "/api/Gallery/get-gallery", //2ci section
  addGallery: "/api/Gallery/add-image",
  delgallery: "/api/Gallery/delete-image",
  putgallery: "/api/Gallery/update-gallery",

  tour: "/api/Tour/get-tours", //most popular tour
  addtour: "/api/Tour/add-tour",
  deltour: "/api/Tour/delete-tour",
  puttour: "/api/Tour/update-tour",

  award: "/api/Gallery/get-sertificates", //award licence
  addaward: "/api/Gallery/add-sertificate",
  delaward: "/api/Gallery/delete-sertificate",
  putaward: "/api/Gallery/update-sertificate",

  addteam: "/api/Team/add-employee", //our team
  team: "/api/Team/get-team",
  delteam: "/api/Team/delete-employee",
  putteam: "/api/Team/update-employee",

  addlogo: "/api/Gallery/add-logo", //home hissesindeki logo olan section
  logo: "/api/Gallery/get-logos",
  dellogo: "/api/Gallery/delete-logo",
  putlogo: "/api/Gallery/update-logo/{id}",

  incoming: "/api/Coming/get-incomings", //incoming
  addincoming: "/api/Coming/add-incoming",
  delincoming: "/api/Coming/delete-incoming",
  putincoming: "/api/Coming/update-incoming",
  getoneicomig: "/api/Coming/get-incoming",

  categoryincoming: "/api/Coming/get-all-regionCategories", //categoryincoming
  addcategoryincoming: "/api/Coming/create-regionCategories",
  delcategoryincoming: "/api/Coming/delete-regionCategories",
  putcategoryincoming: "/api/Coming/update-RegionCategorie",

  outgoing: "/api/Coming/get-outgoings", //outgoing
  addoutgoing: "/api/Coming/add-outgoing",
  getOneOutgoing: "/api/Coming/get-outgoing",
  deloutgoing: "/api/Coming/delete-outgoing",
  putoutgoing: "/api/Coming/update-outgoing",

  service: "/api/Service/get-services", //service page
  addservice: "/api/Service/add-services",
  delservice: "/api/Service/delete-services",
  putservice: "/api/Service/update-services",

  servicecategory: "/api/Service/get-servicesCategories", //service in sagindaki category
  addservicecategory: "/api/Service/add-serviceCategory",
  delservicecategory: "/api/Service/delete-serviceCategory",
  putservicecategory: "/api/Service/update-serviceCategory/{id}",

  activity: "/api/Activity/get-activities", //acticity page
  getOneactivity: "/api/Activity/get-activity",
  addactivity: "/api/Activity/add-activity",
  delactivity: "/api/Activity/delete-activity",
  putactivity: "/api/Activity/update-activity",
};
