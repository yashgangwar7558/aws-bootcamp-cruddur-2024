import {ReactComponent as RepostIcon} from './svg/repost.svg';

export default function ActivityActionRepost(props: any) { 
  const onclick = () => {
    console.log('trigger repost')
  }

  let counter;
  if (props.count > 0) {
    counter = <div className="counter">{props.count}</div>;
  }

  return (
    <div onClick={onclick} className="action activity_action_repost">
      <RepostIcon className='icon' />
      {counter}
    </div>
  )
}