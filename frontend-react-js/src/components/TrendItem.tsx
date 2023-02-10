import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import "./TrendItem.css";

export default function TrendItem(props: {
  hashtag:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  count: any;
}) {
  const commify = (n: { toString: () => string }) => {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
      numberPart.replace(thousands, ",") +
      (decimalPart ? "." + decimalPart : "")
    );
  };

  return (
    <a className="trending" href="#">
      <span className="hashtag">#{props.hashtag}</span>
      <span className="count">#{commify(props.count)} cruds</span>
    </a>
  );
}
