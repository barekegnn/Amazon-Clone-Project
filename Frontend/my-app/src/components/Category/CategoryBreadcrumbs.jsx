import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBreadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="font-bold text-amazonclone-orange" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="text-gray-600 hover:text-amazonclone-orange hover:underline">
                    {crumb.name}
                  </Link>
                  <span className="mx-2 text-gray-400">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumbs;
