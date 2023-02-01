
function convertTokenShadow(item) {
  return `${item.x}px ${item.y}px ${item.blur}px ${item.spread}px ${item.color}`
}

module.exports = { convertTokenShadow } ;
