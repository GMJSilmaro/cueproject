// Public routes that don't require authentication
export const publicRoutes = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/blog',
  '/contact',
];

// Authentication routes for login/register
export const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

// Dashboard base route
export const DASHBOARD_ROOT = '/dashboard';

// Protected routes that require authentication
export const protectedRoutes = [
  DASHBOARD_ROOT,
  `${DASHBOARD_ROOT}/mixes`,
  `${DASHBOARD_ROOT}/events`,
  `${DASHBOARD_ROOT}/community`,
  `${DASHBOARD_ROOT}/settings`,
  `${DASHBOARD_ROOT}/profile`,
  `${DASHBOARD_ROOT}/trending`,
  `${DASHBOARD_ROOT}/messages`,
  `${DASHBOARD_ROOT}/feed`,
  `${DASHBOARD_ROOT}/livestreams`,
  `${DASHBOARD_ROOT}/stream/setup`,
  `${DASHBOARD_ROOT}/livestreams/[id]`,
];

// Helper function to normalize paths for comparison
function normalizePath(path: string) {
  // Remove trailing slashes and convert to lowercase for consistent comparison
  return path.replace(/\/$/, '').toLowerCase();
}

// Helper function to check if a route is protected
export function isProtectedRoute(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  
  // Check if the path starts with /dashboard
  if (normalizedPath.startsWith(DASHBOARD_ROOT)) {
    return true;
  }
  
  // For other protected routes, check exact matches
  return protectedRoutes.some(route => normalizePath(route) === normalizedPath);
}

// Helper function to check if a route is an auth route
export function isAuthRoute(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  return authRoutes.some(route => normalizePath(route) === normalizedPath);
}

// Helper function to check if a route is public
export function isPublicRoute(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  return publicRoutes.some(route => normalizePath(route) === normalizedPath);
}

// Get the default redirect path after login
export function getDefaultRedirectPath(role?: string) {
  switch (role) {
    case 'ADMIN':
      return `${DASHBOARD_ROOT}/admin`;
    case 'DJ':
      return `${DASHBOARD_ROOT}/mixes`;
    default:
      return DASHBOARD_ROOT;
  }
}