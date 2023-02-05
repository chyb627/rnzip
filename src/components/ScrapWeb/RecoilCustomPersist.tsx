import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomLinkList } from '../../states/atomLinkList';
import { getItem } from '../../util/AsyncStorageUtils';

export const RecoilCustomPersist: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [isLoaded, SetIsLoaded] = useState(false);
  const setList = useSetRecoilState(atomLinkList);

  const loadData = useCallback(async () => {
    const data = await getItem('MAIN/LINK_LIST');

    if (data !== null) {
      setList(JSON.parse(data));
    }

    SetIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) return;

    loadData();
  });

  return <>{isLoaded && props.children}</>;
};
