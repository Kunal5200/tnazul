export interface SavedItem {
  id: string;
  title: string;
  image: string;
  location: string;
  price: string;
  monthlyPrice: string;
  duration: string;
  isUrgent?: boolean;
  // contract: {
  //   _id: string;
  // };
}
