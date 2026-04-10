import Papa from 'papaparse';

/**
 * TAMS CSV Parsing Utility
 * Handles parsing, basic validation, and mapping for bulk actor imports.
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const validateActorRow = (row, index) => {
  const errors = [];
  const requiredFields = ['name', 'email', 'role'];

  requiredFields.forEach(field => {
    if (!row[field]) {
      errors.push(`Row ${index + 1}: Missing required field "${field}"`);
    }
  });

  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    errors.push(`Row ${index + 1}: Invalid email format "${row.email}"`);
  }

  const validRoles = ['student', 'teacher', 'mentor', 'parent'];
  if (row.role && !validRoles.includes(row.role.toLowerCase())) {
    errors.push(`Row ${index + 1}: Invalid role "${row.role}". Must be one of: ${validRoles.join(', ')}`);
  }

  return errors;
};
