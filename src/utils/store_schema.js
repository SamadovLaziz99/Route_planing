import {camelize} from "./index";

export const actions = (param) => {
  return {
    get: camelize(`get ${param}`),
    getById: camelize(`get by id ${param}`),
    post: camelize(`post ${param}`),
    put: camelize(`put ${param}`),
    remove: camelize(`delete ${param}`),
  }
}

export const getters = (param) => {
  return {
    load: camelize(`load ${param}`),
    data: camelize(`data ${param}`),
    pending: camelize(`pending ${param}`),
    deleting: camelize(`deleting ${param}`),
    pagination: camelize(`pagination ${param}`),
  }
}
