const getData = (onSuccess, onfail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data').then((response) => response.json()).then((photo) => {
    onSuccess(photo);
  }).catch(() => {
    onfail();
  });
};
const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
