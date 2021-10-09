import cookies from 'js-cookie';

/**
 * Obtener la Cookie 'auth' del Usuario
 * @returns Cookie
 */
export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

/**
 * Crear Cookie 'auth' con Información del Usuario y Tiempo de Expiración
 * @param {Object} user Objeto con datos del Usuario
 */
export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};

/**
 * Remover la Cookie 'auth' del Usuario
 * @returns True
 */
export const removeUserCookie = () => cookies.remove('auth');
