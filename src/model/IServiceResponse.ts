export default interface IServiceResponse<T = void> {
  success: boolean;
  data?: T;
  errorMessage?: Array<String>;
}
