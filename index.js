const StyleDictionary = require('style-dictionary')
const metadata = require('./files/$metadata.json');
const transformTypography = require('./utils/transforms/Typography').TypographyInner;
const themes = metadata.tokenSetOrder;
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

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
  return propsToken.value
}


themes.forEach( function(brand) {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${brand}]`);
  const __StyleDictionary = StyleDictionary
  .extend(getStyleDictionary(brand))
  .registerFormat({
    name: 'addThemeVariablesCSS',
    formatter: function(dictionary) {
      const RootTheme  = brand === 'wiz' ? ':root' : `[data-theme=${brand}]`;
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