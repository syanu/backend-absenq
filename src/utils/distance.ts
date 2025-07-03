const R = 6371000; // Radius bumi dalam meter
const MAX_DISTANCE = 363000; // Maksimum jangkauan dalam meter

// Titik target tetap
const TARGET_LAT = -7.8111057;
const TARGET_LNG = 112.0046051;

const toRad = (value: number): number => (value * Math.PI) / 180;

/**
 * Menghitung jarak dari lokasi pengguna ke lokasi target tetap dan cek jangkauan.
 * @param userLat - Latitude pengguna
 * @param userLng - Longitude pengguna
 * @returns Object: { distance: number, isWithinRange: boolean }
 */
export function checkDistanceToTarget(
  userLat: number,
  userLng: number
): { distance: number; isWithinRange: boolean } {
  const dLat = toRad(TARGET_LAT - userLat);
  const dLon = toRad(TARGET_LNG - userLng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(userLat)) * Math.cos(toRad(TARGET_LAT)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {
    distance,
    isWithinRange: distance <= MAX_DISTANCE,
  };
}
