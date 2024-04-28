import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокручиваем содержимое страницы вверх при изменении пути
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Рендерим null, так как этот компонент не имеет визуального представления
};

export default ScrollToTop;
