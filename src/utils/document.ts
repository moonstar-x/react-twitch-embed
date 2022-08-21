export const clearElementById = (id: string) => {
  const container = document.getElementById(id);
  if (container) {
    container.innerHTML = '';
  }
};
