import { camelize } from "./index";

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
    loadOne: camelize(`one load ${param}`),
    data: camelize(`data ${param}`),
    error: camelize(`error ${param}`),
    pending: camelize(`pending ${param}`),
    deleting: camelize(`deleting ${param}`),
    pagination: camelize(`pagination ${param}`),
  }
}
