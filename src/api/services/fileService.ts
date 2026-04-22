import { axiosInstance } from "../axiosInstance";
import { buildQueryString } from "../params";

export type GetAllFilesParams = {
  per_page?: number;
  page?: number;
};

/**
 * Upload a single file (hero, logo, CV, etc.). `multipart/form-data`
 */
export function uploadFile(formData: FormData) {
  return axiosInstance.post<unknown>("/files/upload", formData).then((r) => r.data);
}

/**
 * Gallery / bulk upload with `files[]` and `sequence_no[]`.
 */
export function uploadFilesBulk(formData: FormData) {
  return axiosInstance
    .post<unknown>("/files/bulk-upload", formData)
    .then((r) => r.data);
}

/**
 * Get all files (paginated). Example: `?per_page=4&page=1`
 */
export function getAllFiles(params: GetAllFilesParams = {}) {
  const query = buildQueryString({
    per_page: params.per_page ?? 4,
    page: params.page ?? 1,
  });
  return axiosInstance.get<unknown>(`/files?${query}`).then((r) => r.data);
}

/**
 * Get a single file by id.
 */
export function getFileById(id: string | number) {
  return axiosInstance.get<unknown>(`/files/${id}`).then((r) => r.data);
}
