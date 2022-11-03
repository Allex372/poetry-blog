import jwt_decode from 'jwt-decode';

const isValidToken = (token: string) => {
  try {
    const decoded = jwt_decode(token);

    return !!decoded;
  } catch (e) {
    console.error(e);

    return false;
  }
};

export { isValidToken };
