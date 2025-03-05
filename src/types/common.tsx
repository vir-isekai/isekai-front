// 서버에서 오는 공통 응답 형식
export interface CommonResponse<T> {
    response: T | null;
    status: number;
}