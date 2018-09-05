// @flow
/* global FormData */
import axios from 'axios'
import fileSaver from 'file-saver'
import bro from 'brototype'

import { getContentDispositionHeader, getFileNameForDownload } from '../utils/service.js'

const POSSIBLE_AXIOS_OPERATIONS_FOR_DOWNLOAD = {
  GET: 'get',
  POST: 'post'
}

export const download = async ({
  url,
  data = null,
  operation
}: {
  url: string,
  data: any,
  operation: 'GET' | 'POST',
}) => {
  let response = null
  if (operation === POSSIBLE_AXIOS_OPERATIONS_FOR_DOWNLOAD.POST) {
    response = await downloadWithPost({ url, data })
  } else if (operation === POSSIBLE_AXIOS_OPERATIONS_FOR_DOWNLOAD.GET) {
    response = await downloadWithGet({ url, data })
  }

  const ContentDispositionHeader = getContentDispositionHeader(response.headers)
  const FILE_NAME = getFileNameForDownload(ContentDispositionHeader)

  await fileSaver.saveAs(response.data, FILE_NAME)
}

const downloadWithGet = ({ url, data }) => {
  return axios.get(`${url}`, {
    responseType: 'blob',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  })
}

const downloadWithPost = ({ url, data }: { url: string, data: Object }) => {
  return axios.post(`${url}`, JSON.stringify(data), {
    responseType: 'blob',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  })
}

export const upload = ({
  url,
  files = []
}: {
  url: string,
  files: Array<{ identifier: string, data: File }>,
}) => {
  const formData = new FormData()

  files.map((file) => {
    formData.append(file.identifier, file.data)
  })

  return axios.post(`${url}`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  })
}

// const handleError = (error) => {
//   if (bro(error).doYouEven('response.data.message')) {
//     console.error(error.response.data.message)
//     throw new Error(error.response.data.message)
//   } else {
//     console.error(error.message)
//     throw new Error(error.message)
//   }
// }
