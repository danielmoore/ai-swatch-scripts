var file = File.saveDialog('Save Swatch to...', '*.json');

if (!file) return;

var json = require('json3');

var appSwatches = Array.prototype.slice.call(app.activeDocument.swatches);

try {
  file.open('w');

  file.write(json.stringify(appSwatches, replacer, 2));
} finally {
  file.close();
}

function replacer(key, value) {
  return key === 'parent' ? undefined : value;
}
