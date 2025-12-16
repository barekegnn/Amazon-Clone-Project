import { MOCK_CATEGORIES } from '../data/mockCategories';

/**
 * --- Architectural Decision: Category Service ---
 * This service encapsulates all business logic for handling category data.
 * It's designed to be a singleton, instantiated with the mock data source.
 * This approach decouples the components from the data structure, making it easy
 * to switch to a real API in the future without changing the UI components.
 * The methods are designed to provide UI-ready data structures (like breadcrumbs)
 * to keep the components clean and focused on rendering.
 */
class CategoryService {
  constructor(categories) {
    // In a real app, this might be an API endpoint or a state management store.
    this.categories = categories;

    // --- Performance Optimization ---
    // A pre-calculated map for O(1) slug-based lookups.
    // This is a trade-off: higher initial memory and processing for faster lookups later.
    // It's worth it for a feature like category resolution that runs frequently.
    this.categoryMap = this.createCategoryMap(categories);
  }

  /**
   * Creates a map of all categories keyed by their unique slug path.
   * e.g., 'electronics/computers/laptops': { ...categoryData }
   * This is a crucial optimization for efficient path resolution.
   * @param {Array} categories The array of category nodes.
   * @param {String} parentPath The slug path of the parent.
   * @param {Map} map The map to build upon.
   * @returns {Map} The completed category map.
   */
  createCategoryMap(categories, parentPath = '', map = new Map()) {
    categories.forEach(category => {
      const currentPath = parentPath ? `${parentPath}/${category.slug}` : category.slug;
      
      // Store the full category object, including its pre-computed full path
      map.set(currentPath, {
          ...category,
          fullPath: `/category/${currentPath}`
      });

      if (category.children && category.children.length > 0) {
        this.createCategoryMap(category.children, currentPath, map);
      }
    });
    return map;
  }

  /**
   * Resolves a URL path (e.g., "electronics/computers/laptops") to its full context.
   * This is the primary method used by the Category page.
   * @param {string} slugPath - A single string of slugs joined by '/', e.g. "electronics/computers"
   * @returns {Object|null} - The resolved context or null if not found.
   */
  resolvePath(slugPath) {
    // Handle root or invalid paths gracefully
    if (!slugPath) {
        // This could represent the root of all categories, a "Shop All" page.
        // For this implementation, we'll return a generic root object.
        return {
            category: {
                name: 'All Categories',
                description: 'Browse all our product categories.'
            },
            breadcrumbs: [{ name: 'Home', path: '/' }],
            children: this.categories,
            products: [],
            isRoot: true
        };
    }

    const targetCategory = this.categoryMap.get(slugPath);

    if (!targetCategory) {
      return null; // Path is invalid
    }

    const breadcrumbs = this.generateBreadcrumbs(slugPath);
    
    // Children and Products are read directly from the resolved category
    const children = targetCategory.children || [];
    const products = targetCategory.products || [];

    return {
      category: targetCategory,
      breadcrumbs,
      children,
      products,
      isRoot: false
    };
  }

  /**
   * Generates a breadcrumb trail for a given slug path.
   * e.g., "electronics/computers/laptops" -> [Home, Electronics, Computers, Laptops]
   * @param {string} slugPath - The full slug path.
   * @returns {Array} An array of breadcrumb objects.
   */
  generateBreadcrumbs(slugPath) {
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    const segments = slugPath.split('/');
    let currentPath = '';

    for (const segment of segments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      const category = this.categoryMap.get(currentPath);
      
      if (category) {
        breadcrumbs.push({
          name: category.name,
          path: category.fullPath,
        });
      }
    }

    return breadcrumbs;
  }

  /**
   * Finds a category by its ID.
   * This is a utility function that might be used for cross-referencing,
   * but path resolution is the primary mechanism.
   */
  findById(id, nodes = this.categories) {
      for (const node of nodes) {
          if (node.id === id) return node;
          if (node.children) {
              const found = this.findById(id, node.children);
              if (found) return found;
          }
      }
      return null;
  }
}

// --- Singleton Instance ---
// Export a single instance of the service. This ensures that the category map
// is only computed once and that all parts of the app use the same data source.
export const categoryService = new CategoryService(MOCK_CATEGORIES);
