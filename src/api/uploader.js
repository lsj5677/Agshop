export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  // const result = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
  //   method: "POST",
  //   body: data,
  // });

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
