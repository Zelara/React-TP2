const afficherToast = (message) => {
    const toastElement = document.getElementById('toastMessage');
    toastElement.innerText = message;
    toastElement.style.display = 'block';
    setTimeout(() => {
      toastElement.style.display = 'none';
    }, 3000); // Disparaît après 3 secondes (3000ms)
  };
  