import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedThunk } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  } else {
    return (
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedThunk())} />
    );
  }
};
