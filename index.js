var activeBox = null;

function pickBox(box) {
  if (activeBox) {
    activeBox.closest('.editor-card').classList.remove('selected');
  }
  activeBox = box;
  box.closest('.editor-card').classList.add('selected');

  // sync controls to whatever that box already has
  document.getElementById('bgColor').value   = rgbToHex(box.style.backgroundColor  || '#ffffff');
  document.getElementById('textColor').value = rgbToHex(box.style.color            || '#222222');

  var currentFont = box.style.fontFamily || "'Segoe UI', sans-serif";
  var sel = document.getElementById('fontFamily');
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === currentFont) {
      sel.selectedIndex = i;
      break;
    }
  }

  document.getElementById('hint').textContent = '✅ Box selected! Adjust the controls and hit Apply.';
}

// wire up each textarea
var boxes = document.querySelectorAll('.editor-box');
boxes.forEach(function(box) {
  box.addEventListener('focus', function() {
    pickBox(box);
  });
  box.addEventListener('click', function() {
    pickBox(box);
  });
});

// apply button
document.getElementById('applyBtn').addEventListener('click', function() {
  if (!activeBox) {
    alert('Click inside an editor box first to select it!');
    return;
  }
  activeBox.style.backgroundColor = document.getElementById('bgColor').value;
  activeBox.style.color           = document.getElementById('textColor').value;
  activeBox.style.fontFamily      = document.getElementById('fontFamily').value;
  document.getElementById('hint').textContent = '🎨 Styles applied!';
});

// reset button — clears the selected box only
document.getElementById('resetBtn').addEventListener('click', function() {
  if (!activeBox) {
    alert('Select a box first.');
    return;
  }
  activeBox.style.backgroundColor = '#ffffff';
  activeBox.style.color           = '#222222';
  activeBox.style.fontFamily      = "'Segoe UI', sans-serif";
  document.getElementById('bgColor').value   = '#ffffff';
  document.getElementById('textColor').value = '#222222';
  document.getElementById('fontFamily').selectedIndex = 0;
  document.getElementById('hint').textContent = '🔄 Box reset to default.';
});

// tiny helper: browser returns rgb(...) so we convert back to #hex for the colour picker
function rgbToHex(rgb) {
  if (!rgb || rgb === '' || rgb.charAt(0) === '#') return rgb || '#ffffff';
  var parts = rgb.match(/\d+/g);
  if (!parts || parts.length < 3) return '#ffffff';
  return '#' +
    ('0' + parseInt(parts[0]).toString(16)).slice(-2) +
    ('0' + parseInt(parts[1]).toString(16)).slice(-2) +
    ('0' + parseInt(parts[2]).toString(16)).slice(-2);
}
