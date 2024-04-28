export interface UploadButtonType {
  text: string;
  validateFunction: Function;
  uploadMethod: "POST" | "PATCH";
  uploadData: Object | FormData;
  uploadDataFormat: "JSON" | "FormData";
  uploadUrl: string;
}
