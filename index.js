const StyleDictionary = require('style-dictionary')
const metadata = require('./files/$metadata.json');
const transformTypography = require('./utils/transforms/Typography').TypographyInner;
const transformShadow = require('./utils/transforms/Shadow').convertTokenShadow;
const themes = metadata.tokenSetOrder;


////////////////////////////////////////
/// Configuração do Style Dictionary ///
///////////////////////////////////////
function getStyleDictionary(brand) {
  return {
    "source": [
      `files/${brand}.json`
    ],
    "platforms": {
      "css": {
        "buildPath": `themes/`,
        "files": [{
          "destination": `${brand}.css`,
          "format": "addThemeVariablesCSS"
        }]
      }
    }
  }
}

function transformValue(propsToken) {
  if(propsToken.type === 'typography') {
    return transformTypography(propsToken)
  }
  if (propsToken.type === 'boxShadow') {
    const item = propsToken.value
    return transformShadow(item)
  }
  return propsToken.value
}

function globalTokens(brand = 'wiz') { 
  if (['fenix', 'wiz', 'global'].includes(brand)) {
    return `:root`
  }
  return `[data-theme=${brand}]`
}

themes.forEach( function(brand) {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${brand}]`);
  const __StyleDictionary = StyleDictionary
  .extend(getStyleDictionary(brand))
  .registerFormat({
    name: 'addThemeVariablesCSS',
    formatter: function(dictionary) {
      const RootTheme  = globalTokens(brand);
return `${RootTheme} {
${dictionary.allProperties
  .map((prop) => {
    const name = prop.path.join().replace(/,/g, '-');
    return `  --${name}: ${transformValue(prop)};`
  })
  .join("\n")}
}`;
    },  
  });

  __StyleDictionary.buildPlatform('css');
  console.log('\nEnd processing');
})