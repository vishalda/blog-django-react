import { IsAuthenticated } from "../../auth/helper/index";

export const getPost = () => {
  return fetch(`/api/post/`, { method: `GET` })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = () => {
  return fetch(`/api/post/categories/`, { method: `GET` })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getComments = (id) => {
  return fetch(`/api/post/comment/${id}/`, { method: `GET` })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUserDetail = (id) => {
  return fetch(`/api/user/${id}/`, { method: `GET` })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const ViewPostInDetail = (id) => {
  return fetch(`/api/post/view/${id}/`, { method: `GET` })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const CreateNewPost = (postData) => {
  //Getting userId by checking for Authentication
  let userId = IsAuthenticated() && IsAuthenticated().user.id;

  //Creating a new Form Data
  const formData = new FormData();
  for (const dataName in postData) {
    formData.append(dataName, postData[dataName]);
  }

  return fetch(`/api/post/create-post/${userId}/`, {
    method: `POST`,
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const DeletePost = (postId) => {
  return fetch(`/api/post/delete-post/${postId}/`, {
    method: `POST`,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const CreateComment = (author_id, post_id, content) => {
  const formData = new FormData();
  formData.append("content", content);
  return fetch(`/api/post/create-comment/${author_id}/${post_id}/`, {
    method: `POST`,
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const ChangePostTextField = (post_id, data) => {
  const formData = new FormData();
  //Getting all changed data in formData
  for (const dataName in data) {
    formData.append(dataName, data[dataName]);
  }
  return fetch(`/api/post/update-post/${post_id}/`, {
    method: `POST`,
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const ChangePostImage = (post_id, imageObject) => {
  const formData = new FormData();
  const image = imageObject.image;
  //Changing only image field
  formData.append("image", image);
  return fetch(`/api/post/update-post-image/${post_id}/`, {
    method: `POST`,
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
