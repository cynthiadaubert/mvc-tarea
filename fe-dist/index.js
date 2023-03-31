function getProfile() {
  const res = fetch("http://localhost:3000/profile", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

(function () {
  getProfile();
  let filePic;
  const form = document.querySelector(".form");
  const myDropzone = new Dropzone(".pfp-container", {
    url: "/falsa",
    clickable: true,
    autoProcessQueue: false,
  });
  myDropzone.on("addedfile", function (file) {
    filePic = file;
    // usando este evento pueden acceder al dataURL directamente, pero primero guardamos el file pporque sino despues no existe
  });
  form.addEventListener("submit", (e) => {
    const fullname = e.target.fullname.value;
    const bio = e.target.bio.value;
    e.preventDefault();
    fetch("http://localhost:3000/profile", {
      method: "POST",
      /*   mode: "cors", */
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /*         fullname, */
        bio,
        picURL: filePic.dataURL,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
})();
