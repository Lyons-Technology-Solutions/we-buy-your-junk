/**
 * Centralized image imports for the site.
 * Astro auto-optimizes these (WebP, responsive sizes, lazy loading).
 */

// =============================================================================
// HERO IMAGES
// =============================================================================
export { default as heroYard } from '../assets/images/hero/yard-operations.jpg';

// =============================================================================
// SERVICE IMAGES  
// =============================================================================
export { default as serviceAutoParts } from '../assets/images/services/auto-parts.jpg';
export { default as serviceJunkCars } from '../assets/images/services/junk-cars.jpg';
export { default as serviceInventory } from '../assets/images/services/inventory.jpg';

// =============================================================================
// FACILITY IMAGES
// =============================================================================
export { default as facilityWarehouse } from '../assets/images/facility/warehouse.jpg';
export { default as facilityExterior } from '../assets/images/facility/exterior.jpg';
export { default as facilityHistory } from '../assets/images/facility/history.jpg';

// =============================================================================
// BLOG IMAGES
// =============================================================================
export { default as blogFeatured } from '../assets/images/blog/featured.jpg';
export { default as blogDefault } from '../assets/images/blog/article-default.jpg';

// =============================================================================
// SEO-OPTIMIZED ALT TAGS
// =============================================================================
export const altTags = {
  heroYard: 'We Buy Your Junk LLC scrap metal yard in Jackson, Michigan with organized metal piles and recycling equipment',
  serviceAutoParts: 'Quality used auto parts inventory at We Buy Your Junk LLC Jackson MI - engines, transmissions, and body panels',
  serviceJunkCars: 'Junk car removal service in Jackson County Michigan - We Buy Your Junk LLC pays cash for junk vehicles',
  serviceInventory: 'Used auto parts warehouse at We Buy Your Junk LLC featuring organized shelves of tested car components',
  facilityWarehouse: 'Inside We Buy Your Junk LLC facility in Jackson MI showing industrial recycling operations',
  facilityExterior: 'We Buy Your Junk LLC scrap yard entrance and facility exterior in Jackson Michigan',
  facilityHistory: 'We Buy Your Junk LLC family-owned scrap metal business serving Jackson County since 2008',
  blogFeatured: 'Scrap metal recycling industry insights and tips from We Buy Your Junk LLC Jackson Michigan',
  blogDefault: 'Metal recycling and junk car buying guide from We Buy Your Junk LLC in Jackson MI',
};
