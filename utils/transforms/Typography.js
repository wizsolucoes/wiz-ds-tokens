const ConvertValue = require('./convertValue').ConvertValue;

function TypographyInner (item) {
  
  let _valueTypography = { 
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none'
  };

  const keysTypography = !!item.value ? Object.keys(item.value) : [];
  keysTypography.forEach( (key) => {
    if(item.value && item.value[key]) {
      console.log('--------------> ', item.value[key])
      _valueTypography[key] = ConvertValue(item.value[key])
    }
  })
  const _format = `${_valueTypography.fontStyle} ${_valueTypography.fontWeight} ${_valueTypography.fontSize}/${_valueTypography.lineHeight} ${_valueTypography.fontFamily}`
  return _format
}


module.exports = {
  TypographyInner
};
