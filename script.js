(function(window) {
  function hasTryAgain() {
    const btns = document.querySelectorAll('button');
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].textContent.toLowerCase() === 'try again') {
        return true;
      }
    }
    return false;
  }

  window.instacli = {
    hasTryAgain,
  };

}(window));
