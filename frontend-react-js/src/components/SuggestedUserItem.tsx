import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import './SuggestedUserItem.css';

export default function SugestedUserItem(props: { display_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; handle: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
  return (
    <div className="user">
      <div className='avatar'></div>
      <div className='identity'>
        <span className="display_name">{props.display_name}</span>
        <span className="handle">@{props.handle}</span>
      </div>
    </div>
  );
}