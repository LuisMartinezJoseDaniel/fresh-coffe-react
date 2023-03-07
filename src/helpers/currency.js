
export const formatearDinero = (cantidad) => {
  const dinero = cantidad.toLocaleString( 'en-US', {
    style: 'currency',
    currency: 'USD',

  })
  
  return dinero
}
