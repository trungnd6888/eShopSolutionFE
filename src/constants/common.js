export const STORAGE_CONST = {
  USER: 'user',
  TOKEN: 'token',
};

export const STORAGE_IMAGE = {
  AVATAR_THUMBNAI:
    'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
  PRODUCT_THUMBNAI:
    'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg',
};

export const STORAGE_USER = {
  NAME: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  EMAIL_ADDRESS: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  AVATAR_IMAGE_URL: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri',
  FULLNAME: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  ID: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
};

export const formatter = new Intl.NumberFormat('vn-VN', {
  style: 'currency',
  currency: 'VND',
});
