/**
 * Menghitung jarak antara lokasi pengguna dan lokasi target menggunakan rumus Haversine,
 * serta memeriksa apakah jaraknya berada dalam batas yang diizinkan.
 *
 * @param userLat - Latitude pengguna
 * @param userLng - Longitude pengguna
 * @param targetLat - Latitude target
 * @param targetLng - Longitude target
 * @param maxDistance - Jarak maksimum yang diizinkan dalam meter (default: 363000)
 * @returns Object berisi jarak dalam meter dan status apakah masih dalam jangkauan
 */
export function validateUserProximity(
  userLat: number,
  userLng: number,
  targetLat: number,
  targetLng: number,
  maxDistance: number = 363000
): { distance: number; isWithinRange: boolean } {
  const EARTH_RADIUS = 6371000; // Radius bumi dalam meter

  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const deltaLat = toRadians(targetLat - userLat);
  const deltaLng = toRadians(targetLng - userLng);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(userLat)) * Math.cos(toRadians(targetLat)) *
    Math.sin(deltaLng / 2) ** 2;

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * centralAngle;

  return {
    distance,
    isWithinRange: distance <= maxDistance,
  };
}