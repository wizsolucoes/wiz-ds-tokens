const regex = /(\{)(.*?)(\})/gmi;


function hasVariables(value) {
    return value.replace(regex, (_, __, p2) => {
      const _value = p2.replaceAll('.', '-');;
        return `var(--${_value})`
    });
}

function ConvertValue(value, type) {
  const _value = String(value)
  if(typeof _value === undefined) { 
    return ;
  }

  if(_value.indexOf('{') >= 0 && _value.indexOf('}') >= 0) {
    return hasVariables(_value);
  }

  if(_value.indexOf('px') === -1 && type === 'px') {
    return `${_value}px`
  }
  return _value
}

module.exports = {
  ConvertValue
};