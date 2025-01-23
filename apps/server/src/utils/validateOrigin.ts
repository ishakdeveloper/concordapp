export const validateOrigin = (request: Request) => {
  const origin = request.headers.get('origin') || '';
  if (process.env.WEB_URL === origin) {
    return true;
  }
  return false;
};
