export function matchesSearchQuery(query: string, ...fields: unknown[]): boolean {
  const needle = query.trim().toLowerCase();

  if (!needle) {
    return true;
  }

  return fields.some((field) =>
    getSearchableValues(field).some((haystack) => matchesNeedle(haystack, needle))
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
    addDigitVariants(values, raw.toLowerCase());
  }

  if (typeof value === 'number' && !Number.isNaN(value)) {
    addNumericVariants(values, value);
  } else {
    const numericValue = Number(raw);
    if (raw !== '' && !Number.isNaN(numericValue)) {
      addNumericVariants(values, numericValue);
    }
  }

  const parsedDate = new Date(raw);
  if (!Number.isNaN(parsedDate.getTime())) {
    values.add(parsedDate.toLocaleDateString('en-US').toLowerCase());
    values.add(parsedDate.toISOString().toLowerCase());
    values.add(parsedDate.toISOString().split('T')[0].toLowerCase());
  }

  return Array.from(values);
}

function addNumericVariants(values: Set<string>, numericValue: number): void {
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
  addDigitVariants(values, String(numericValue));
  addDigitVariants(values, numericValue.toFixed(2));
}

function addDigitVariants(values: Set<string>, text: string): void {
  const digitsOnly = text.replace(/\D/g, '');
  if (digitsOnly) {
    values.add(digitsOnly);
  }
}

function matchesNeedle(haystack: string, needle: string): boolean {
  if (matchesOrderedSubsequence(haystack, needle)) {
    return true;
  }

  const needleDigits = needle.replace(/\D/g, '');
  const haystackDigits = haystack.replace(/\D/g, '');

  if (!needleDigits || !haystackDigits) {
    return false;
  }

  return matchesOrderedSubsequence(haystackDigits, needleDigits);
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
