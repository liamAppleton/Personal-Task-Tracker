const validateForm = ({ title, description, dueDate }) => {
  if (title.length < 3) return 'Task must be at least 3 characters.';
  if (title.length > 50) return 'Task cannot be more than 50 characters.';
  if (description.length < 10)
    return 'Description must be at least 10 characters.';
  if (description.length > 70)
    return 'Description cannot be more than 70 characters.';
  if (!dueDate) return 'Date required.';
  return 'valid';
};

const validateTask = ({ title, description, dueDate }) => {
  const today = new Date();
  if (title && title.length < 3) return 'Task must be at least 3 characters.';
  if (title && title.length > 50)
    return 'Task cannot be more than 50 characters.';
  if (description && description.length < 10)
    return 'Description must be at least 10 characters.';
  if (description && description.length > 70)
    return 'Description cannot be more than 70 characters.';
  if (dueDate && dueDate < today) return 'Date cannot be in the past.';
  return 'valid';
};

export { validateForm, validateTask };
