const formatJoinDate = dateString => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

export { formatJoinDate };
