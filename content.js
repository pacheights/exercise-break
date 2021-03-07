setInterval(() => {
  if (new Date().getSeconds() === 0) {
    if (document.visibilityState === 'hidden') return;
    const popup = document.querySelector('#workOutPopup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    } else {
      const container = createContainer();
      const text = createText('Work Out');
      container.appendChild(text);
      document.body.appendChild(container);
    }
    // alert('new minute');
  }
}, 1000);
const createContainer = () => {
  var div = document.createElement('div');
  div.id = 'workOutPopup';
  div.style.position = 'fixed';
  div.style.top = '30px';
  div.style.right = '12px';
  div.style.zIndex = 2147483647;
  div.style.width = '300px';
  div.style.height = '115px';
  div.style.backgroundColor = 'lightblue';
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.borderRadius = '4px';
  div.style.boxShadow = '0px 3px 15px rgba(0,0,0,0.2)';
  return div;
};

const createText = (text) => {
  var div = document.createElement('div');
  div.innerText = text;
  div.style.color = 'black';
  return div;
};
