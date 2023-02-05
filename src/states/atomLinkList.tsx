import { atom, AtomEffect } from 'recoil';
import { getItem, removeItem, setItem } from '../util/AsyncStorageUtils';

export type AtomLinkList = {
  list: {
    title: string;
    image: string;
    link: string;
    createdAt: string;
  }[];
};

const asyncStorageEffect =
  (key: string): any =>
  async ({ setSelf, onSet }: any) => {
    const savedValue = await getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: AtomLinkList, _: never, isReset: boolean) => {
      console.log('onSet', newValue);

      isReset ? removeItem(key) : setItem(key, JSON.stringify(newValue));
    });
  };

export const atomLinkList = atom<AtomLinkList>({
  key: 'MAIN/LINK_LIST',
  default: {
    list: [],
  },
  effects: [asyncStorageEffect('MAIN/LINK_LIST')],
});
