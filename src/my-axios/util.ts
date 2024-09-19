export const stringify = (params: any) => {
  if (typeof params !== 'object') {
    throw new Error('Expected params to be an object');
  }

  let result: string[] = [];
  for (const key in params) {
    const value = params[key];
    result.push(`${key}=${value}`);
  }

  return result.join('&');
}