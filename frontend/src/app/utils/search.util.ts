export function matchesSearchQuery(query: string, ...fields: unknown[]): boolean {
  const needle = query.trim().toLowerCase();

  if (!needle) {
    return true;
  }

  return fields.some((field) =>
    getSearchableValues(field).some((haystack) => matchesOrderedSubsequence(haystack, needle))
  );
}

function getSearchableValues(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }

  const values = new Set<string>();
  const raw = String(value).trim();

  if (raw) {
    values.add(raw.toLowerCase());
  }

  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    values.add(String(numericValue).toLowerCase());
    values.add(numericValue.toFixed(2).toLowerCase());
    values.add(
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
        .format(numericValue)
        .toLowerCase()
    );
  }

  const parsedDate = new Date(raw);
  if (!Number.isNaN(parsedDate.getTime())) {
    values.add(parsedDate.toLocaleDateString('en-US').toLowerCase());
    values.add(parsedDate.toISOString().toLowerCase());
    values.add(parsedDate.toISOString().split('T')[0].toLowerCase());
  }

  return Array.from(values);
}

function matchesOrderedSubsequence(haystack: string, needle: string): boolean {
  if (!needle) {
    return true;
  }

  let needleIndex = 0;

  for (let i = 0; i < haystack.length && needleIndex < needle.length; i++) {
    if (haystack[i] === needle[needleIndex]) {
      needleIndex++;
    }
  }

  return needleIndex === needle.length;
}
