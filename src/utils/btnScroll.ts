export const smoothScrollToId = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = document.querySelector('header')?.offsetHeight || 0; // altura da barra de navegação fixa
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};