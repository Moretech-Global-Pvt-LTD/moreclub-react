import { Link } from "react-router-dom";

export default function FooterWidget(props) {
  const { widgetTitle, navList } = props;

  const liItems = navList.map((ele, index) => (
    <li key={index}>
      <Link to={ele.url}>{ele.text}</Link>
    </li>
  ));

  return (
    <div className="col-6 col-sm-4">
      <div className="footer-widget-area mb-70">
        <h5
          className={`mb-4 ${widgetTitle === "Marketplace" ? "text-gray" : ""}`}
        >
          {widgetTitle}
          {widgetTitle === "Marketplace" && <>{" "}<i class="bi bi-lock-fill fs-6"></i></>}
        </h5>
        <ul className="list-unstyled mb-0">
          {widgetTitle === "Marketplace" ? (
            <>
              {navList.map((ele, index) => (
              <li key={index}>
                <p className="text-gray">{ele.text}</p>
              </li>
              ))
              }
            </>
          ) : (
            <>{liItems}</>
          )}
        </ul>
      </div>
    </div>
  );
}
