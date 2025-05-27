
// This file is for frontend configuration only
// Static file serving is handled by Vite dev server or production server

export const ensureSitesDirectory = () => {
  console.log('Sites directory will be served by the web server at /sites path');
  // In development: Vite serves public folder automatically
  // In production: Web server (nginx/apache) should serve public/sites at /sites
};

export const getPublicImagePath = (clientId: string, fileName: string): string => {
  return `/sites/${clientId}/${fileName}`;
};
