const { minTitle, maxTitle, minDescription, maxDescription, dateRequired } = {
  minTitle: 'Task must be at least 3 characters.',
  maxTitle: 'Task cannot be more than 50 characters.',
  minDescription: 'Description must be at least 10 characters.',
  maxDescription: 'Description cannot be more than 70 characters.',
  dateRequired: 'Date required.',
};

const validateForm = ({ title, description, dueDate }) => {
  if (title.length < 3) return minTitle;
  if (title.length > 50) return maxTitle;
  if (description.length < 10) return minDescription;
  if (description.length > 70) return maxDescription;
  if (!dueDate) return dateRequired;
  return 'valid';
};

const validateTableUpdate = ({ title, description }) => {
  if (title && title.length < 3) return minTitle;
  if (title && title.length > 50) return maxTitle;
  if (description && description.length < 10) return minDescription;
  if (description && description.length > 70) return maxDescription;
  return 'valid';
};

export { validateForm, validateTableUpdate };
