import { ReactComponent as HeartIcon } from "./svg/heart.svg";

interface IActivityActionLike {
  count: number;
  activity_uuid?: any;
}

export const ActivityActionLike = ({ count }: IActivityActionLike) => {
  const onclick = () => {
    console.log("toggle like/unlike");
  };

  let counter;
  if (count > 0) {
    counter = <div className="counter">{count}</div>;
  }

  return (
    <div onClick={onclick} className="action activity_action_heart">
      <HeartIcon className="icon" />
      {counter}
    </div>
  );
};
