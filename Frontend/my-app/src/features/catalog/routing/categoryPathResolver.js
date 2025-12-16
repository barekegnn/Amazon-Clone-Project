// Pure path-resolution + breadcrumb logic for catalog routing.
// Keeps URL concerns separate from React and from provider-specific APIs.

// In a real system this table would be data‑driven (CMS / backend config).
// For now, it documents which URL paths map onto provider categories.
// Multiple site-level categories can point at the same provider category;
// this keeps the routing realistic even though the demo provider has a flat catalog.
const PROVIDER_CATEGORY_MAP = [
  {
    // /category/electronics
    pathSegments: ["electronics"],
    providerCategorySlug: "electronics",
    displayName: "Electronics",
    description:
      "Discover the latest in electronics, from laptops and gaming rigs to accessories.",
  },
  {
    // /category/books -> backed by provider "books" category
    pathSegments: ["books"],
    providerCategorySlug: "books",
    displayName: "Books",
    description: "Curated picks from our reading & learning collections.",
  },
  {
    // /category/fashion (root fashion landing)
    pathSegments: ["fashion"],
    providerCategorySlug: "women's clothing",
    displayName: "Fashion",
    description: "Browse our selection in fashion.",
  },
  {
    // /category/fashion/womens
    pathSegments: ["fashion", "womens"],
    providerCategorySlug: "women's clothing",
    displayName: "Women\u2019s Fashion",
    description: "Curated picks in women’s clothing and accessories.",
  },
  {
    // /category/fashion/womens/clothing
    pathSegments: ["fashion", "womens", "clothing"],
    providerCategorySlug: "women's clothing",
    displayName: "Women’s Clothing",
    description: "From casual wear to formal attire.",
  },
  {
    // /category/fashion/womens/clothing/dresses
    pathSegments: ["fashion", "womens", "clothing", "dresses"],
    providerCategorySlug: "women's clothing",
    displayName: "Dresses",
    description: "Shop a wide range of styles for any occasion.",
  },
  {
    // /category/fashion/mens
    pathSegments: ["fashion", "mens"],
    providerCategorySlug: "men's clothing",
    displayName: "Men’s Fashion",
    description: "Essentials and statement pieces for every day.",
  },
  {
    // Direct provider category routes from the left-hand index
    pathSegments: ["men's clothing"],
    providerCategorySlug: "men's clothing",
    displayName: "Men’s Clothing",
    description: "Shop shirts, pants, outerwear, and more.",
  },
  {
    pathSegments: ["women's clothing"],
    providerCategorySlug: "women's clothing",
    displayName: "Women’s Clothing",
    description: "Shop dresses, tops, bottoms, and more.",
  },
  {
    // /category/jewelery
    pathSegments: ["jewelery"],
    providerCategorySlug: "jewelery",
    displayName: "Jewelry",
    description: "Rings, necklaces, and more.",
  },
  {
    // /category/home-garden or /category/home
    pathSegments: ["home-garden"],
    providerCategorySlug: "electronics",
    displayName: "Home & Garden",
    description: "Ideas and products for every room and outdoor space.",
  },
  {
    pathSegments: ["home"],
    providerCategorySlug: "electronics",
    displayName: "Home & Decor",
    description: "Decor, accents, and pieces for every room.",
  },
];

const normalizeSegment = (segment) =>
  segment.trim().toLowerCase().replace(/\s+/g, "-");

const segmentsEqual = (a, b) => normalizeSegment(a) === normalizeSegment(b);

// Resolves a wildcard path (e.g., "fashion/women") into a catalog context.
// Never assumes a maximum depth; the matching strategy can evolve independently.
export const resolveCategoryPath = ({ slugPath }) => {
  const trimmed = slugPath?.replace(/^\/+|\/+$/g, "") ?? "";

  if (!trimmed) {
    return {
      isRoot: true,
      providerCategorySlug: null,
      displayName: "All Departments",
      description: "Browse departments and featured collections.",
      pathSegments: [],
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "All Departments", href: "/category" },
      ],
    };
  }

  const segments = trimmed.split("/").filter(Boolean);

  // Find the deepest configured mapping that matches the current path.
  // This allows you to introduce more specific mappings over time
  // without breaking existing URLs.
  let bestMatch = null;

  for (const candidate of PROVIDER_CATEGORY_MAP) {
    if (candidate.pathSegments.length > segments.length) continue;

    const head = segments.slice(0, candidate.pathSegments.length);

    const isMatch = candidate.pathSegments.every((seg, index) =>
      segmentsEqual(seg, head[index])
    );

    if (isMatch) {
      if (
        !bestMatch ||
        candidate.pathSegments.length > bestMatch.pathSegments.length
      ) {
        bestMatch = candidate;
      }
    }
  }

  // If nothing is configured, derive a provider mapping from the top-level segment
  // so that arbitrarily deep virtual paths still resolve to concrete product data.
  if (!bestMatch) {
    const top = segments[0];
    let inferredProviderCategorySlug = null;

    switch (normalizeSegment(top)) {
      case "electronics":
        inferredProviderCategorySlug = "electronics";
        break;
      case "fashion":
        inferredProviderCategorySlug = "women's clothing";
        break;
      case "books":
        inferredProviderCategorySlug = "books";
        break;
      case "jewelery":
      case "jewelry":
        inferredProviderCategorySlug = "jewelery";
        break;
      case "home":
      case "home-garden":
        inferredProviderCategorySlug = "electronics";
        break;
      default:
        inferredProviderCategorySlug = null;
    }

    return {
      isRoot: false,
      providerCategorySlug: inferredProviderCategorySlug,
      displayName: segments[segments.length - 1],
      description: null,
      pathSegments: segments,
      breadcrumbs: buildBreadcrumbsFromSegments(segments),
    };
  }

  const breadcrumbs = buildBreadcrumbsFromSegments(segments, bestMatch);

  return {
    isRoot: false,
    providerCategorySlug: bestMatch.providerCategorySlug,
    displayName: bestMatch.displayName,
    description: bestMatch.description,
    pathSegments: segments,
    breadcrumbs,
  };
};

const buildBreadcrumbsFromSegments = (segments, matchedConfig) => {
  const crumbs = [{ label: "Home", href: "/" }];

  let accumulated = [];

  for (let i = 0; i < segments.length; i += 1) {
    accumulated.push(segments[i]);
    const href = `/category/${accumulated.join("/")}`;

    const isLast = i === segments.length - 1;
    const labelFromConfig =
      matchedConfig && i === matchedConfig.pathSegments.length - 1
        ? matchedConfig.displayName
        : null;

    crumbs.push({
      label: labelFromConfig || segments[i],
      href,
      isCurrent: isLast,
    });
  }

  return crumbs;
};
