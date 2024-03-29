export type AccountBookHistory = {
  id?: number;
  type: '사용' | '수입';
  price: number;
  date: number;
  comment: string;
  createdAt: number;
  updatedAt: number;
  photoUrl: string | null;
};
