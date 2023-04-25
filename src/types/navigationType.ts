// Navigation Screen
export type RootStackParamList = {
  Home: undefined;
  Detail: { url: string; author: string };
};

// Seacrch Screen

export type SearchRootStackParamList = {
  BottomTab: undefined;
  SearchDetail: undefined;
};

export type BottomTabsParamList = {
  SearchHome: undefined;
  Favorite: undefined;
};
