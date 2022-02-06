function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function formatTripName(yr, loc) {
  return `${yr}_${camelize(loc)}`
}

export function toTitleCase (str) {
  return str
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toWebp(str) {
  return str.substring(0, str.indexOf('.')) + '.webp';
}

export function cloudinaryFileName(year, location, filename) {
  const tripName = formatTripName(year, location);
  return `https://memorlee-optomizer.mo.cloudinary.net/${tripName}/${filename}`;
}