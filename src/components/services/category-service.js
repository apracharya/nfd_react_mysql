import { myAxios } from "./helper"

export const loadAllCategories = () => {
  return myAxios.get('/category/read').then(response => {return response.data});
}

export const readCategory = (category) => {
  return myAxios.get(`/category/read/${category.id}`).then(response => {return response.data});
}