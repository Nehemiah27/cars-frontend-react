import { useLocation } from "react-router-dom";
import PageHeading from "../enum/PageHeading";
import WebURL from "../enum/WebURL";

export const PageTitle = () => {
  const location = useLocation();
  switch (location.pathname) {
    case WebURL.HOME_PAGE:
      return PageHeading.HOME_PAGE;
    case WebURL.VIEW_CARS:
      return PageHeading.VIEW_CARS;
    case WebURL.ADD_CARS:
      return PageHeading.ADD_CARS;
    default:
      return PageHeading.DASH_BOARD;
  }
};
