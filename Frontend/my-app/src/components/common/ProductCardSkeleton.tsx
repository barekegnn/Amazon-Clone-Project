import React from 'react';
import { Skeleton } from './Skeleton';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col m-2.5 p-5 bg-white z-30 min-w-[250px] flex-1">
      <div className="flex justify-center mb-3">
        <Skeleton variant="rectangular" height={200} width="100%" className="max-h-[200px]" />
      </div>
      <Skeleton variant="text" height={20} width="90%" className="mb-2" />
      <Skeleton variant="text" height={20} width="60%" className="mb-2" />
      <div className="flex gap-1 mb-2">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="circular" width={16} height={16} />
      </div>
      <Skeleton variant="text" height={24} width="30%" className="mt-auto mb-2" />
      <Skeleton variant="rectangular" height={32} width="100%" />
    </div>
  );
};
